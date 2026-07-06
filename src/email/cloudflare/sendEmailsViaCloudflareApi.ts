import { createError, createResult, type Result } from "@adaptive-ds/result"
import * as a from "valibot"
import { jsonStringifyPretty } from "../../json/jsonStringifyPretty.js"

export type CloudflareAddressInfo = {
  name?: string
  email: string
}

/**
 * https://developers.cloudflare.com/email-service/api/send-emails/rest-api/
 */
export type CloudflareEmailProps = {
  from?: CloudflareAddressInfo
  // Recipient email addresses.
  to: Array<CloudflareAddressInfo>
  // Cc recipient email addresses.
  cc?: Array<CloudflareAddressInfo>
  // Bcc recipient email addresses.
  bcc?: Array<CloudflareAddressInfo>
  // Reply-to email address.
  replyTo?: CloudflareAddressInfo
  // Email subject.
  subject: string
  html?: string
  text?: string
  // Custom headers for threading, list management or tracking.
  headers?: Record<string, string>
  // Total message size cannot exceed 5 MiB including attachments.
  attachments?: Array<CloudflareEmailAttachment>
}

export type CloudflareEmailAttachment = {
  // Content of the attached file as Base64 string.
  content: string
  // Name of attached file.
  filename: string
  // Content type of the attachment, e.g. "application/pdf".
  type: string
  // "attachment" (default) or "inline" for embedded images.
  disposition?: "attachment" | "inline"
  // For inline attachments: reference the image via <img src="cid:..."> in your HTML.
  contentId?: string
}

// Recipient addresses categorized by delivery status.
export type CloudflareEmailSend = {
  messageId?: string
  delivered?: string[]
  permanentBounces?: string[]
  queued?: string[]
}

/**
 * All documented REST API error codes.
 * https://developers.cloudflare.com/email-service/api/send-emails/rest-api/#error-codes
 */
export const cloudflareEmailErrorCodes: Record<number, { httpStatus: number; message: string; description: string }> = {
  10000: {
    httpStatus: 404,
    message: "email.sending.error.not_found",
    description: "Resource not found",
  },
  10001: {
    httpStatus: 400,
    message: "email.sending.error.invalid_request_schema",
    description: "Malformed request",
  },
  10002: {
    httpStatus: 500,
    message: "email.sending.error.internal_server",
    description: "Server error",
  },
  10003: {
    httpStatus: 500,
    message: "email.sending.error.not_implemented",
    description: "Not implemented",
  },
  10004: {
    httpStatus: 429,
    message: "email.sending.error.throttled",
    description: "Rate limited",
  },
  10100: {
    httpStatus: 503,
    message: "email.sending.error.authentication.upstream",
    description: "Auth service unavailable",
  },
  10101: {
    httpStatus: 401,
    message: "email.sending.error.authentication.unauthorized",
    description: "Missing or invalid token",
  },
  10102: {
    httpStatus: 403,
    message: "email.sending.error.authentication.forbidden",
    description: "Token lacks email permissions",
  },
  10103: {
    httpStatus: 401,
    message: "email.sending.error.authentication.bad_token_type",
    description: "Incorrect token type",
  },
  10105: {
    httpStatus: 403,
    message: "email.sending.error.authentication.not_entitled",
    description: "Account unauthorized",
  },
  10200: {
    httpStatus: 400,
    message: "email.sending.error.email.too_big",
    description: "Exceeds size limit",
  },
  10201: {
    httpStatus: 400,
    message: "email.sending.error.email.no_content_length",
    description: "Missing content length",
  },
  10202: {
    httpStatus: 400,
    message: "email.sending.error.email.invalid",
    description: "Invalid email content",
  },
  10203: {
    httpStatus: 403,
    message: "email.sending.error.email.sending_disabled",
    description: "Sending disabled",
  },
}

/**
 * https://developers.cloudflare.com/email-service/api/send-emails/rest-api/
 */
export async function sendEmailsViaCloudflareApi(
  props: CloudflareEmailProps,
  apiKey: string,
  accountId: string,
): Promise<Result<CloudflareEmailSend>> {
  const op = "sendEmailsViaCloudflareApi"

  // Check required fields individually
  if (!props.from) {
    return createError(op, "Missing required 'from' field", jsonStringifyPretty(props))
  }
  if (!props.from.email) {
    return createError(op, "Missing required 'email' in 'from' field", jsonStringifyPretty(props))
  }
  if (!props.subject) {
    return createError(op, "Missing required 'subject' field", jsonStringifyPretty(props))
  }
  if (props.to.length === 0) {
    return createError(op, "Missing required 'to' recipients", jsonStringifyPretty(props))
  }
  if (!props.text && !props.html) {
    return createError(op, "missing text and html part", jsonStringifyPretty(props))
  }

  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`

  const { from, to, cc, bcc, replyTo, attachments, ...rest } = props

  const bodyObject = {
    ...rest,
    from: serializeAddress(from),
    to: serializeAddresses(to),
  } as any
  if (cc) {
    bodyObject.cc = serializeAddresses(cc)
  }
  if (bcc) {
    bodyObject.bcc = serializeAddresses(bcc)
  }
  if (replyTo) {
    bodyObject.reply_to = serializeAddress(replyTo)
  }
  if (attachments) {
    bodyObject.attachments = attachments.map(serializeAttachment)
  }

  const body = JSON.stringify(bodyObject)

  const fetched = await fetch(baseUrl, {
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
  })
  const fetchText = await fetched.text()

  if (fetched.ok) {
    const successParsing = a.safeParse(successSchemaFromString, fetchText)
    if (successParsing.success) {
      const result = successParsing.output.result
      return createResult({
        messageId: result.message_id,
        delivered: result.delivered,
        permanentBounces: result.permanent_bounces,
        queued: result.queued,
      })
    }
    return createResult({} as CloudflareEmailSend)
  }

  const parsing = a.safeParse(errSchemaFromString, fetchText)
  if (!parsing.success) {
    return createError(op, a.summarize(parsing.issues), fetchText)
  }

  const errors = parsing.output.errors
  const errorMessages = errors.map((error) => {
    const known = cloudflareEmailErrorCodes[error.code]
    if (known) return `${error.code} ${error.message} (${known.description})`
    return `${error.code} ${error.message}`
  })
  return createError(op, errorMessages.join("; ") || "Unknown error", fetchText)
}

function serializeAddresses(addresses: CloudflareAddressInfo[]): Array<string | { address: string; name: string }> {
  return addresses.map(serializeAddress)
}

function serializeAddress(recipient: CloudflareAddressInfo): string | { address: string; name: string } {
  if (recipient.name) return { address: recipient.email, name: recipient.name }
  return recipient.email
}

function serializeAttachment(attachment: CloudflareEmailAttachment) {
  const { contentId, ...rest } = attachment
  if (contentId) return { ...rest, content_id: contentId }
  return rest
}

const successSchema = a.object({
  success: a.literal(true),
  result: a.object({
    message_id: a.optional(a.string()),
    delivered: a.optional(a.array(a.string())),
    permanent_bounces: a.optional(a.array(a.string())),
    queued: a.optional(a.array(a.string())),
  }),
})
const successSchemaFromString = a.pipe(a.string(), a.parseJson(), successSchema)

const errSchema = a.object({
  success: a.literal(false),
  errors: a.array(
    a.object({
      code: a.number(),
      message: a.string(),
    }),
  ),
})
const errSchemaFromString = a.pipe(a.string(), a.parseJson(), errSchema)
