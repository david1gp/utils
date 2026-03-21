import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(30)

export function generateId30(): string {
  return gen()
}
