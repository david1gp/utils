import { type Result } from "@adaptive-ds/result"
import { sendEmailsViaResend, type ResendEnvVariableNames } from "./sendEmailsViaResend.js"
import { type ResendAddressInfo, type ResendEmailProps, type ResendEmailSend } from "./sendEmailsViaResendApi.js"

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
