import { generateReadableId } from "./generateReadableId"

const gen = generateReadableId(30)

export function generateId30(): string {
  return gen()
}
