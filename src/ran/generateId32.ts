import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(32)

export function generateId32(): string {
  return gen()
}
