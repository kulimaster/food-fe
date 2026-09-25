import { describe, expect, it } from 'vitest'
import { tokenProperties, tokensOf } from './tokens'

describe('design tokens', () => {
  it('parses colors and resolves references to other tokens', () => {
    const colors = tokensOf('color')

    expect(colors).toContainEqual({ name: 'primary', value: '#006c49' })
    expect(colors).toContainEqual(
      expect.objectContaining({ name: 'macro-protein', value: '#005ac2' }),
    )
  })

  it('skips namespace resets', () => {
    expect(tokensOf('color').map(({ name }) => name)).not.toContain('*')
  })

  it('keeps inline comments', () => {
    expect(tokensOf('radius')).toContainEqual({
      name: 'lg',
      value: '1rem',
      comment: 'cards, buttons, inputs',
    })
  })

  it('reads typography sub-properties separately from the size', () => {
    expect(tokensOf('text').map(({ name }) => name)).toContain('body-md')
    expect(tokenProperties('text-body-md')).toEqual({ 'line-height': '24px', 'font-weight': '400' })
  })

  it('has a color for every macro nutrient', () => {
    const names = tokensOf('color').map(({ name }) => name)

    for (const macro of ['calories', 'protein', 'carbs', 'fat', 'fiber']) {
      expect(names).toContain(`macro-${macro}`)
    }
  })
})
