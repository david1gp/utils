import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(16)

export function generateId16(): string {
  return gen()
}
