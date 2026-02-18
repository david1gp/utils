import { generateReadableId } from "./generateReadableId"

const gen = generateReadableId(20)

export function generateId20(): string {
  return gen()
}
