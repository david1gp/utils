import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(5)

export function generateId5(): string {
  return gen()
}
