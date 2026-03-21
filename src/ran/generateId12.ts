import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(12)

export function generateId12(): string {
  return gen()
}
