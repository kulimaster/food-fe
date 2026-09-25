import 'i18next'
import type { en } from './locales/en'

// Typed translation keys: t('macros.protein') is checked, t('macros.protien') is a type error
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof en
    }
  }
}
