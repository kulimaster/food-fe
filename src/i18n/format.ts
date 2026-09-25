import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { fallbackLanguage } from './config'

/**
 * Locale-aware number and date formatting (Intl). Czech: `1 850 kcal`, `12,5 g`;
 * English: `1,850 kcal`, `12.5 g`.
 */
export function createFormatters(locale: string) {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 })
  // 'kilocalorie' is not an Intl-sanctioned unit, so the unit is appended (no-break space)
  const wholeNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 })
  const mass = new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: 'gram',
    maximumFractionDigits: 1,
  })
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 })
  const shortDate = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' })
  const longDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const time = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' })

  return {
    /** 1850.46 → `1 850,5` / `1,850.5` */
    number: (value: number) => number.format(value),
    /** kcal, whole numbers: `1 850 kcal` */
    energy: (kcal: number) => `${wholeNumber.format(kcal)}\u00a0kcal`,
    /** grams: `12,5 g` */
    mass: (grams: number) => mass.format(grams),
    /** ratio 0–1: 0.73 → `73 %` / `73%` */
    percent: (ratio: number) => percent.format(ratio),
    /** `25. 10.` / `Oct 25` */
    shortDate: (date: Date) => shortDate.format(date),
    /** `středa 25. října` / `Wednesday, October 25` */
    longDate: (date: Date) => longDate.format(date),
    /** `8:30` / `8:30 AM` */
    time: (date: Date) => time.format(date),
  }
}

export type Formatters = ReturnType<typeof createFormatters>

/** Formatters for the current UI language; updates when the language changes. */
export function useFormatters(): Formatters {
  const { i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? fallbackLanguage
  return useMemo(() => createFormatters(locale), [locale])
}
