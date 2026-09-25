import { describe, expect, it } from 'vitest'
import { plainSpaces } from '@/test/text'
import { createFormatters } from './format'

describe('createFormatters', () => {
  const cs = createFormatters('cs')
  const en = createFormatters('en')
  const date = new Date(2026, 9, 25, 8, 30)

  it('formats energy in whole kcal', () => {
    expect(plainSpaces(cs.energy(1850.4))).toBe('1 850 kcal')
    expect(plainSpaces(en.energy(1850.4))).toBe('1,850 kcal')
    expect(en.energy(1850)).toContain('\u00a0kcal') // never wraps between number and unit
  })

  it('formats mass in grams with one decimal', () => {
    expect(plainSpaces(cs.mass(12.54))).toBe('12,5 g')
    expect(en.mass(12.54)).toBe('12.5 g')
  })

  it('formats plain numbers and percentages', () => {
    expect(plainSpaces(cs.number(1850.46))).toBe('1 850,5')
    expect(en.number(1850.46)).toBe('1,850.5')
    expect(plainSpaces(cs.percent(0.734))).toBe('73 %')
    expect(en.percent(0.734)).toBe('73%')
  })

  it('formats dates and times per language', () => {
    expect(plainSpaces(cs.shortDate(date))).toBe('25. 10.')
    expect(en.shortDate(date)).toBe('Oct 25')
    expect(cs.longDate(date)).toBe('neděle 25. října')
    expect(en.longDate(date)).toBe('Sunday, October 25')
    expect(cs.time(date)).toBe('8:30')
    expect(plainSpaces(en.time(date))).toBe('8:30 AM')
  })
})
