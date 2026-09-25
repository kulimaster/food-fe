import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { fallbackLanguage, type Language, languageStorageKey, supportedLanguages } from './config'
import { detectLanguage } from './detect'
import { cs } from './locales/cs'
import { en } from './locales/en'

function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem(languageStorageKey)
  } catch {
    return null // storage can be unavailable (private mode, blocked cookies)
  }
}

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
})

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    cs: { common: cs },
  },
  lng: detectLanguage(readStoredLanguage(), navigator.languages),
  fallbackLng: fallbackLanguage,
  supportedLngs: supportedLanguages,
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false }, // React already escapes
  initAsync: false, // resources are bundled, so initialise synchronously
})

/** Switches the UI language and remembers the choice for next visits. */
export async function setLanguage(language: Language): Promise<void> {
  try {
    localStorage.setItem(languageStorageKey, language)
  } catch {
    // Not persisted – the choice still applies to this session
  }
  await i18n.changeLanguage(language)
}

export { i18n }
