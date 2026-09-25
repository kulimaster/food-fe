import { describe, expect, it } from 'vitest'
import { macroClasses, nutrients, progressRatio } from './macros'

describe('progressRatio', () => {
  it('is the share of the goal', () => {
    expect(progressRatio(110, 150)).toBeCloseTo(0.733, 3)
  })

  it('is clamped to 0–1', () => {
    expect(progressRatio(300, 250)).toBe(1)
    expect(progressRatio(-5, 250)).toBe(0)
  })

  it('handles a zero goal', () => {
    expect(progressRatio(0, 0)).toBe(0)
    expect(progressRatio(10, 0)).toBe(1)
  })
})

describe('macroClasses', () => {
  it('has colors for calories and every nutrient', () => {
    for (const key of ['calories', ...nutrients] as const) {
      expect(macroClasses[key].fill).toBe(`bg-macro-${key}`)
      expect(macroClasses[key].text).toBe(`text-macro-${key}-strong`)
    }
  })
})
