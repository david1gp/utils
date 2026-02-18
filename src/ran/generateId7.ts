import { generateReadableId } from "./generateReadableId"

const gen = generateReadableId(7)

export function generateId7(): string {
  return gen()
}
