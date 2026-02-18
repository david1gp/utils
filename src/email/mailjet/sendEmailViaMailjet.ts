import { sendEmailsViaMailjet, type MailjetEnvVariableNames } from "./sendEmailsViaMailjet"
import { type MailjetEmailProps, type MailjetSingleMessageResult } from "./sendEmailsViaMailjetApi"
import { createError, createResult, type Result, type ResultErr } from "../../result/Result"

export async function sendEmailViaMailjet(
  props: MailjetEmailProps,
  envVariableNames: MailjetEnvVariableNames,
  SandboxMode: boolean = false,
): Promise<Result<MailjetSingleMessageResult>> {
  const op = "sendEmailViaMailjet"
  const result = await sendEmailsViaMailjet(
    {
      Messages: [props],
      SandboxMode,
    },
    envVariableNames,
  )

  if (!result.success) {
    return result as ResultErr
  }

  const message0 = result.data.Messages[0]
  if (!message0) {
    return createError(op, "missing message from mailjet api")
  }

  return createResult(message0)
}
