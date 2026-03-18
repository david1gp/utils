export function objCreateFromArr<TKey extends string | number | symbol, TValue>(
  arr: readonly TKey[],
  map: (key: TKey) => TValue,
) {
  return Object.fromEntries(arr.map((key) => [key, map(key)])) as Record<TKey, TValue>
}

export const objCreateFromArrV = objCreateFromArr
