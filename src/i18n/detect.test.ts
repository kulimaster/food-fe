import { describe, expect, it } from 'vitest'
import { detectLanguage } from './detect'

describe('detectLanguage', () => {
  it('prefers the stored choice', () => {
    expect(detectLanguage('cs', ['en-US'])).toBe('cs')
  })

  it('ignores an unsupported stored value', () => {
    expect(detectLanguage('de', ['cs-CZ'])).toBe('cs')
  })

  it('uses the first supported browser language, ignoring the region', () => {
    expect(detectLanguage(null, ['de-DE', 'CS-cz', 'en'])).toBe('cs')
  })

  it('falls back to English when no browser language is supported', () => {
    expect(detectLanguage(null, ['de-DE', 'sk'])).toBe('en')
    expect(detectLanguage(null, [])).toBe('en')
  })
})
