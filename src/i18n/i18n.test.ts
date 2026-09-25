import { afterEach, describe, expect, it } from 'vitest'
import { languageStorageKey } from './config'
import { i18n, setLanguage } from './index'

describe('i18n', () => {
  afterEach(async () => {
    localStorage.clear()
    await i18n.changeLanguage('en')
  })

  it('starts in English in the (en-US) test browser', () => {
    expect(i18n.language).toBe('en')
    expect(i18n.t('macros.protein')).toBe('Protein')
  })

  it('setLanguage switches texts, remembers the choice and sets <html lang>', async () => {
    await setLanguage('cs')

    expect(i18n.t('macros.protein')).toBe('Bílkoviny')
    expect(localStorage.getItem(languageStorageKey)).toBe('cs')
    expect(document.documentElement.lang).toBe('cs')
  })

  it('uses Czech plural forms', async () => {
    await i18n.changeLanguage('cs')

    expect(i18n.t('items', { count: 1 })).toBe('1 položka')
    expect(i18n.t('items', { count: 3 })).toBe('3 položky')
    expect(i18n.t('items', { count: 5 })).toBe('5 položek')
    expect(i18n.t('items', { count: 0 })).toBe('0 položek')
  })
})
