import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(10)

export function generateId10(): string {
  return gen()
}
