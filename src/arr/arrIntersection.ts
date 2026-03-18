export function arrIntersection<T>(a: readonly T[], b: readonly T[]) {
  return a.filter((item) => b.includes(item))
}
