export function arrLastUnsafe<T>(arr: readonly T[]) {
  return arr[arr.length - 1]!
}
