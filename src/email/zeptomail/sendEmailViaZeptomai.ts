import { type Result } from "@adaptive-ds/result"
import {
    sendEmailsViaZeptomail,
    type ZeptomailEnvVariableNames,
    type ZeptomailOptionalSender,
} from "./sendEmailsViaZeptomail.js"
import { type ZeptomailAddress } from "./sendEmailsViaZeptomailApi.js"

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
