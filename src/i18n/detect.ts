import { fallbackLanguage, isSupportedLanguage, type Language } from './config'

/**
 * Picks the UI language: the user's stored choice first, then the first supported language
 * from the browser preferences (`cs-CZ` → `cs`), otherwise the fallback.
 */
export function detectLanguage(
  stored: string | null,
  browserLanguages: readonly string[],
): Language {
  if (isSupportedLanguage(stored)) {
    return stored
  }
  for (const tag of browserLanguages) {
    const base = tag.toLowerCase().split('-')[0]
    if (isSupportedLanguage(base)) {
      return base
    }
  }
  return fallbackLanguage
}
