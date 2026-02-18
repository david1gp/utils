import * as a from "valibot"
import { type ResultErr, createResultError } from "./Result"
import { stringifyValibotErrors } from "../valibot/stringifyValibotErrors"

export function createResultErrorSchema(op: string, valibotError: a.ValiError<any>, errorData?: string): ResultErr {
  // const errorMessage = valibotError.issues.map((issue) => issue.message).join(", ")
  const errorMessage = stringifyValibotErrors(valibotError)
  return createResultError(op, errorMessage, errorData)
}
