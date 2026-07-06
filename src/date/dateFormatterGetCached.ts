import type { DateFormatStyle } from "./dateFormatStyle.js"
import { dateFormatterCreate } from "./dateFormatterCreate.js"

let cachedLocale: string | undefined
let cachedDateFormat: DateFormatStyle | undefined
let cachedFormatter: Intl.DateTimeFormat | undefined

export function dateFormatterGetCached(format: DateFormatStyle, l?: string): Intl.DateTimeFormat {
  if (!cachedFormatter || cachedLocale !== l || cachedDateFormat !== format) {
    cachedLocale = l
    cachedDateFormat = format
    cachedFormatter = dateFormatterCreate(format, l)
  }
  return cachedFormatter!
}
