import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(24)

export function generateId24(): string {
  return gen()
}
