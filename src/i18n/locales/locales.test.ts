import { describe, expect, it } from 'vitest'
import { cs } from './cs'
import { en } from './en'

const pluralSuffix = /_(zero|one|two|few|many|other)$/

/** Flattens nested texts to `macros.protein`-style keys */
function flatten(texts: object, prefix = ''): Map<string, string> {
  const result = new Map<string, string>()
  for (const [key, value] of Object.entries(texts)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') {
      result.set(path, value)
    } else {
      for (const [nestedKey, nestedValue] of flatten(value as object, path)) {
        result.set(nestedKey, nestedValue)
      }
    }
  }
  return result
}

/** Plural variants (items_one, items_few…) count as one key: items */
function baseKeys(texts: object): Set<string> {
  return new Set([...flatten(texts).keys()].map((key) => key.replace(pluralSuffix, '')))
}

function placeholders(text: string): string[] {
  return [...text.matchAll(/{{\s*(\w+)/g)].map((match) => match[1] ?? '').sort()
}

describe('locales', () => {
  it('Czech and English have the same keys', () => {
    expect([...baseKeys(cs)].sort()).toEqual([...baseKeys(en)].sort())
  })

  it('no text is empty', () => {
    for (const [key, text] of [...flatten(en), ...flatten(cs)]) {
      expect(text.trim(), key).not.toBe('')
    }
  })

  it('Czech plurals define all Czech forms', () => {
    const pluralBases = [...flatten(cs).keys()]
      .filter((key) => pluralSuffix.test(key))
      .map((key) => key.replace(pluralSuffix, ''))

    for (const base of new Set(pluralBases)) {
      for (const form of ['one', 'few', 'many', 'other']) {
        expect(flatten(cs).has(`${base}_${form}`), `${base}_${form}`).toBe(true)
      }
    }
  })

  it('translations use the same placeholders as English', () => {
    const csTexts = flatten(cs)
    for (const [key, text] of flatten(en)) {
      const base = key.replace(pluralSuffix, '')
      const csText = csTexts.get(key) ?? csTexts.get(`${base}_other`)
      expect(placeholders(csText ?? ''), key).toEqual(placeholders(text))
    }
  })
})
