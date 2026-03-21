import type { Result } from "@adaptive-ds/result"
import type { MailjetEnvVariableNames } from "./sendEmailsViaMailjet.js"
import type { MailjetAddressInfo, MailjetEmailProps, MailjetSingleMessageResult } from "./sendEmailsViaMailjetApi.js"
import { sendEmailViaMailjet } from "./sendEmailViaMailjet.js"

export async function sendEmailViaMailjet2(
  subject: string,
  html: string,
  text: string,
  to: MailjetAddressInfo,
  envVariableNames: MailjetEnvVariableNames,
  SandboxMode: boolean = false,
): Promise<Result<MailjetSingleMessageResult>> {
  const props: MailjetEmailProps = {
    Subject: subject,
    HTMLPart: html,
    TextPart: text,
    To: [to],
  }
  return sendEmailViaMailjet(props, envVariableNames, SandboxMode)
}
