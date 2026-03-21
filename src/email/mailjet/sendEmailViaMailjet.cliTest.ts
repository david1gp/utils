import type { MailjetEnvVariableNames } from "./sendEmailsViaMailjet.js"
import type { MailjetEmailProps } from "./sendEmailsViaMailjetApi.js"
import { readEnvVariableResult } from "../../env/readEnvVariable.js"
import { jsonStringifyPretty } from "../../json/jsonStringifyPretty.js"
import { sendEmailViaMailjet } from "./sendEmailViaMailjet.js"

async function main() {
  const envVariableNames = {
    apiKeyPublic: "MAILJET_APIKEY_PUBLIC",
    apiKeyPrivate: "MAILJET_APIKEY_PRIVATE",
    senderAddress: "MAILJET_SENDER_ADDRESS",
    senderName: "MAILJET_SENDER_NAME",
  } as const satisfies MailjetEnvVariableNames

  const toAddressResult = readEnvVariableResult("EMAIL_ADDRESS_E2E_TEST")
  if (!toAddressResult.success) {
    console.error(toAddressResult)
    return
  }
  const toAddress = toAddressResult.data
  const data: MailjetEmailProps = {
    To: [
      {
        Email: toAddress,
        Name: "Test Recipient",
      },
    ],
    Subject: "Test Email",
    TextPart: "This is a test email",
    HTMLPart: "<p>This is a test email</p>",
  }
  const sandboxMode = true

  const result = await sendEmailViaMailjet(data, envVariableNames, sandboxMode)
  console.log("result:", result, jsonStringifyPretty(result))
}

main()
