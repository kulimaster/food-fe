import { composeStories } from '@storybook/react-vite'
import { screen } from '@testing-library/react'
import { plainSpaces } from '@/test/text'
import { afterEach, describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import * as stories from './MacroProgressBar.stories'

const { Protein, OverGoal, MacrosCard, MacrosCardCzech } = composeStories(stories)

describe('MacroProgressBar', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('is a meter named by the nutrient, with grams as value text', async () => {
    await Protein.run()
    const meter = screen.getByRole('meter', { name: 'Protein' })

    expect(plainSpaces(meter.getAttribute('aria-valuetext'))).toBe('110 g of 150 g')
    expect(meter.firstElementChild).toHaveStyle({ width: `${String((110 / 150) * 100)}%` })
    expect(screen.getByText('Protein')).toHaveClass('text-macro-protein-strong')
  })

  it('caps the bar at the goal', async () => {
    await OverGoal.run()

    expect(screen.getByRole('meter').firstElementChild).toHaveStyle({ width: '100%' })
  })

  it('renders all four nutrients in the macros card', async () => {
    await MacrosCard.run()

    expect(screen.getAllByRole('meter').map((m) => m.getAttribute('aria-labelledby'))).toHaveLength(
      4,
    )
    for (const name of ['Protein', 'Carbs', 'Fat', 'Fiber']) {
      expect(screen.getByRole('meter', { name })).toBeInTheDocument()
    }
  })

  it('is translated in Czech', async () => {
    await MacrosCardCzech.run()

    expect(await screen.findByRole('meter', { name: 'Bílkoviny' })).toBeInTheDocument()
    expect(screen.getByRole('meter', { name: 'Vláknina' })).toBeInTheDocument()
  })
})
