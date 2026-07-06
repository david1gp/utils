import type { DateTimeFormatStyle } from "./dateTimeFormatStyle.js"
import { dateTimeFormatterCreate } from "./dateTimeFormatterCreate.js"

let cachedLocale: string | undefined
let cachedFormat: DateTimeFormatStyle | undefined
let cachedFormatter: Intl.DateTimeFormat | undefined

export function dateTimeFormatterGetCached(format: DateTimeFormatStyle, l?: string): Intl.DateTimeFormat {
  if (!cachedFormatter || cachedLocale !== l || cachedFormat !== format) {
    cachedLocale = l
    cachedFormat = format
    cachedFormatter = dateTimeFormatterCreate(format, l)
  }
  return cachedFormatter!
}
