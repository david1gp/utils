import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(15)

export function generateId15(): string {
  return gen()
}
