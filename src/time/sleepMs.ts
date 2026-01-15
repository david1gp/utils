/**
 * Delays execution for a given number of milliseconds.
 * @param ms - The number of milliseconds to sleep.
 */
export function sleepMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
