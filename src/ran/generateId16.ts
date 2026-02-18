import { generateReadableId } from "./generateReadableId"

const gen = generateReadableId(16)

export function generateId16(): string {
  return gen()
}
