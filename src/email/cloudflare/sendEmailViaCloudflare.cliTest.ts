import { nowIso } from "../../date/nowIso.js"
import { readEnvVariableResult } from "../../env/readEnvVariable.js"
import { jsonStringifyPretty } from "../../json/jsonStringifyPretty.js"
import { type CloudflareEnvVariableNames, sendEmailsViaCloudflare } from "./sendEmailsViaCloudflare.js"

sendTest()

async function sendTest() {
  const envVariableNames = {
    apiKey: "CLOUDFLARE_EMAIL_API_KEY",
    accountId: "CLOUDFLARE_EMAIL_ACCOUNT_ID",
    senderAddress: "CLOUDFLARE_EMAIL_SENDER_ADDRESS",
    senderName: "CLOUDFLARE_EMAIL_SENDER_NAME",
  } as const satisfies CloudflareEnvVariableNames

  const toAddressResult = readEnvVariableResult("EMAIL_ADDRESS_E2E_TEST")
  if (!toAddressResult.success) {
    console.error(toAddressResult)
    return
  }
  const toAddress = toAddressResult.data
  const got = await sendEmailsViaCloudflare(
    {
      to: [{ name: "", email: toAddress }],
      subject: "test email " + nowIso(),
      html: "<strong>it works</strong>",
    },
    envVariableNames,
  )
  console.log(jsonStringifyPretty(got))
}
