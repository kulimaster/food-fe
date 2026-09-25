import { describe, expect, it } from 'vitest'
import { createFormatters } from './format'

/** Intl uses (narrow) no-break spaces in Czech; compare with plain spaces */
const plain = (text: string) => text.replace(/[\u00a0\u202f]/g, ' ')

describe('createFormatters', () => {
  const cs = createFormatters('cs')
  const en = createFormatters('en')
  const date = new Date(2026, 9, 25, 8, 30)

  it('formats energy in whole kcal', () => {
    expect(plain(cs.energy(1850.4))).toBe('1 850 kcal')
    expect(plain(en.energy(1850.4))).toBe('1,850 kcal')
    expect(en.energy(1850)).toContain('\u00a0kcal') // never wraps between number and unit
  })

  it('formats mass in grams with one decimal', () => {
    expect(plain(cs.mass(12.54))).toBe('12,5 g')
    expect(en.mass(12.54)).toBe('12.5 g')
  })

  it('formats plain numbers and percentages', () => {
    expect(plain(cs.number(1850.46))).toBe('1 850,5')
    expect(en.number(1850.46)).toBe('1,850.5')
    expect(plain(cs.percent(0.734))).toBe('73 %')
    expect(en.percent(0.734)).toBe('73%')
  })

  it('formats dates and times per language', () => {
    expect(plain(cs.shortDate(date))).toBe('25. 10.')
    expect(en.shortDate(date)).toBe('Oct 25')
    expect(cs.longDate(date)).toBe('neděle 25. října')
    expect(en.longDate(date)).toBe('Sunday, October 25')
    expect(cs.time(date)).toBe('8:30')
    expect(plain(en.time(date))).toBe('8:30 AM')
  })
})
