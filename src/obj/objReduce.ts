export function objReduce<T extends Record<string, unknown>, TValue>(
  obj: T,
  reducer: (acc: TValue, entry: [keyof T, T[keyof T]]) => TValue,
  initial: TValue,
) {
  return Object.entries(obj).reduce((acc, entry) => reducer(acc, entry as [keyof T, T[keyof T]]), initial)
}
