import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(6)

export function generateId6(): string {
  return gen()
}
