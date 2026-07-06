import type { Result } from "@adaptive-ds/result"
import { type CloudflareEnvVariableNames, sendEmailsViaCloudflare } from "./sendEmailsViaCloudflare.js"
import type { CloudflareAddressInfo, CloudflareEmailProps, CloudflareEmailSend } from "./sendEmailsViaCloudflareApi.js"

/**
 * https://developers.cloudflare.com/email-service/api/send-emails/rest-api/
 */
export async function sendSingleEmailViaCloudflare(
  subject: string,
  html: string,
  text: string,
  to: CloudflareAddressInfo,
  envVariableNames: CloudflareEnvVariableNames,
): Promise<Result<CloudflareEmailSend>> {
  const props: CloudflareEmailProps = {
    subject,
    html,
    text,
    to: [to],
  }
  return sendEmailsViaCloudflare(props, envVariableNames)
}
