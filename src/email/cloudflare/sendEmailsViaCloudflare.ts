import type { Result, ResultErr } from "@adaptive-ds/result"
import { readEnvVariableResult } from "../../env/readEnvVariable.js"
import {
  type CloudflareEmailProps,
  type CloudflareEmailSend,
  sendEmailsViaCloudflareApi,
} from "./sendEmailsViaCloudflareApi.js"

export type CloudflareEnvVariableNames = {
  apiKey: string
  accountId: string
  senderAddress: string
  senderName: string
}

/**
 * https://developers.cloudflare.com/email-service/api/send-emails/rest-api/
 */
export async function sendEmailsViaCloudflare(
  props: CloudflareEmailProps,
  envVariableNames: CloudflareEnvVariableNames,
): Promise<Result<CloudflareEmailSend>> {
  const op = "sendEmailsViaCloudflare"
  const apiKeyResult = readEnvVariableResult(envVariableNames.apiKey)
  if (!apiKeyResult.success) return apiKeyResult as ResultErr
  const apiKey = apiKeyResult.data

  const accountIdResult = readEnvVariableResult(envVariableNames.accountId)
  if (!accountIdResult.success) return accountIdResult as ResultErr
  const accountId = accountIdResult.data

  if (!props.from) {
    const senderAddressResult = readEnvVariableResult(envVariableNames.senderAddress)
    if (!senderAddressResult.success) return senderAddressResult as ResultErr
    const senderAddress = senderAddressResult.data

    const senderNameResult = readEnvVariableResult(envVariableNames.senderName)
    if (!senderNameResult.success) return senderNameResult as ResultErr
    const senderName = senderNameResult.data

    props.from = { name: senderName, email: senderAddress }
  }

  return sendEmailsViaCloudflareApi(props, apiKey, accountId)
}
