import {
  type ZeptomailAddress,
  type ZeptomailProps,
  sendEmailsViaZeptomailApi,
} from "./sendEmailsViaZeptomailApi"
import { readEnvVariableResult } from "../../env/readEnvVariable"
import type { Result } from "../../result/Result"

export type ZeptomailEnvVariableNames = {
  apiKey: string
  senderAddress: string
  senderName: string
}

export interface ZeptomailOptionalSender extends Omit<ZeptomailProps, "from"> {
  from?: ZeptomailAddress
}

export async function sendEmailsViaZeptomail(
  props: ZeptomailOptionalSender,
  envVariableNames: ZeptomailEnvVariableNames,
): Promise<Result<null>> {
  const apiKeyResult = readEnvVariableResult(envVariableNames.apiKey)
  if (!apiKeyResult.success) return apiKeyResult
  const apiKey = apiKeyResult.data

  if (!props.from) {
    const senderAddressResult = readEnvVariableResult(envVariableNames.senderAddress)
    if (!senderAddressResult.success) return senderAddressResult
    const senderAddress = senderAddressResult.data

    const senderNameResult = readEnvVariableResult(envVariableNames.senderName)
    if (!senderNameResult.success) return senderNameResult
    const senderName = senderNameResult.data

    props.from = { name: senderName, address: senderAddress }
  }

  return sendEmailsViaZeptomailApi(props as ZeptomailProps, apiKey)
}
