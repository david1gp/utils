import type { MailjetEnvVariableNames } from "./sendEmailsViaMailjet"
import type {
  MailjetAddressInfo,
  MailjetEmailProps,
  MailjetSingleMessageResult,
} from "./sendEmailsViaMailjetApi"
import { sendEmailViaMailjet } from "./sendEmailViaMailjet"
import type { Result } from "../../result/Result"

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
