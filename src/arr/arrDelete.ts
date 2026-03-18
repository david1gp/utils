export function arrDelete<T>(arr: readonly T[], value: T) {
  return arr.filter((item) => item !== value)
}
