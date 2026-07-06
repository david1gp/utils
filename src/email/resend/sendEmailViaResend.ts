import type { Result } from "@adaptive-ds/result"
import { type ResendEnvVariableNames, sendEmailsViaResend } from "./sendEmailsViaResend.js"
import type { ResendAddressInfo, ResendEmailProps, ResendEmailSend } from "./sendEmailsViaResendApi.js"

/**
 * https://resend.com/docs/api-reference/emails/send-email
 */
export async function sendSingleEmailViaResend(
  subject: string,
  html: string,
  text: string,
  to: ResendAddressInfo,
  envVariableNames: ResendEnvVariableNames,
): Promise<Result<ResendEmailSend>> {
  const props: ResendEmailProps = {
    subject,
    html,
    text,
    to: [to],
  }
  return sendEmailsViaResend(props, envVariableNames)
}
