import { type Result } from "~result"
import { sendEmailsViaResend, type ResendEnvVariableNames } from "./sendEmailsViaResend"
import { type ResendAddressInfo, type ResendEmailProps, type ResendEmailSend } from "./sendEmailsViaResendApi"

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
