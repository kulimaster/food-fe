import { composeStories } from '@storybook/react-vite'
import { screen } from '@testing-library/react'
import { plainSpaces } from '@/test/text'
import { describe, expect, it } from 'vitest'
import * as stories from './MacroRing.stories'

const { Protein, MobileSummary } = composeStories(stories)

describe('MacroRing', () => {
  it('is a meter named by the nutrient', async () => {
    await Protein.run()
    const meter = screen.getByRole('meter', { name: 'Protein' })

    expect(plainSpaces(meter.getAttribute('aria-valuetext'))).toBe('120 g of 150 g')
    expect(meter).toHaveAttribute('aria-valuenow', '120')
  })

  it('mobile summary shows calories and three macro rings', async () => {
    await MobileSummary.run()

    expect(screen.getByRole('meter', { name: 'Calories' })).toBeInTheDocument()
    for (const name of ['Protein', 'Carbs', 'Fat']) {
      expect(screen.getByRole('meter', { name })).toBeInTheDocument()
    }
  })
})
