import { generateReadableId } from "./generateReadableId"

const gen = generateReadableId(24)

export function generateId24(): string {
  return gen()
}
