import { generateReadableId } from "./generateReadableId.js"

const gen = generateReadableId(7)

export function generateId7(): string {
  return gen()
}
