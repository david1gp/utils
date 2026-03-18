export function arrToObj<T extends string | number | symbol, TValue>(
  arr: readonly T[],
  map: (item: T) => TValue,
): Record<T, TValue> {
  return Object.fromEntries(arr.map((item) => [item, map(item)])) as Record<T, TValue>
}
