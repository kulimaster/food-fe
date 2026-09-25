export const supportedLanguages = ['cs', 'en'] as const
export type Language = (typeof supportedLanguages)[number]

/** Used when the browser prefers none of the supported languages (ADR 0003) */
export const fallbackLanguage: Language = 'en'

export const languageStorageKey = 'nutriplan.language'

export function isSupportedLanguage(value: unknown): value is Language {
  return supportedLanguages.includes(value as Language)
}
