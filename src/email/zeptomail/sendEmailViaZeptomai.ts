import {
  sendEmailsViaZeptomail,
  type ZeptomailEnvVariableNames,
  type ZeptomailOptionalSender,
} from "./sendEmailsViaZeptomail"
import { type ZeptomailAddress } from "./sendEmailsViaZeptomailApi"
import { type Result } from "../../result/Result"

export async function sendEmailViaZeptomai(
  subject: string,
  html: string,
  to: ZeptomailAddress,
  envVariableNames: ZeptomailEnvVariableNames,
): Promise<Result<null>> {
  const props: ZeptomailOptionalSender = {
    subject,
    htmlBody: html,
    to: [to],
  }
  return sendEmailsViaZeptomail(props, envVariableNames)
}
