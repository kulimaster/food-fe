import { composeStories } from '@storybook/react-vite'
import { screen } from '@testing-library/react'
import { plainSpaces } from '@/test/text'
import { afterEach, describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import * as stories from './MacroChip.stories'

const { Protein, AllNutrientsCzech } = composeStories(stories)

describe('MacroChip', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('shows the short form visually and the full name to screen readers', async () => {
    await Protein.run()

    expect(screen.getByText('12 g P', { normalizer: plainSpaces })).toHaveAttribute(
      'aria-hidden',
      'true',
    )
    expect(screen.getByText('12 g Protein', { normalizer: plainSpaces })).toHaveClass('sr-only')
  })

  it('uses the readable macro text color on its tint', async () => {
    await Protein.run()
    const chip = screen.getByText('12 g P', { normalizer: plainSpaces }).parentElement

    expect(chip).toHaveClass('bg-macro-protein/10', 'text-macro-protein-strong')
  })

  it('uses Czech short forms and decimal comma', async () => {
    await AllNutrientsCzech.run()

    expect(await screen.findByText('12 g B', { normalizer: plainSpaces })).toBeInTheDocument()
    expect(screen.getByText('8,5 g V', { normalizer: plainSpaces })).toBeInTheDocument()
  })
})
