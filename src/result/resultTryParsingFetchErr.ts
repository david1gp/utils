import * as a from "valibot"
import { createError } from "./Result"
import { resultErrSchemaFromJsonString } from "./resultErrSchema"

export function resultTryParsingFetchErr(op: string, text: string, statusCode: number, responseStatusText: string) {
  const op2 = "resultTryParsingFetchErr"
  const parsingErr = a.safeParse(resultErrSchemaFromJsonString, text)
  if (!parsingErr.success) {
    const e = createError(op + "." + op2, responseStatusText, text)
    e.statusCode = statusCode
    return e
  }
  const e = parsingErr.output
  e.statusCode = statusCode
  return e
}
