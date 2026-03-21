import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(3)

export function generateId3(): string {
  return gen()
}
