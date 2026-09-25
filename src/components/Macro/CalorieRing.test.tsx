import { composeStories } from '@storybook/react-vite'
import { screen } from '@testing-library/react'
import { plainSpaces } from '@/test/text'
import { afterEach, describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import * as stories from './CalorieRing.stories'

const { OnTrack, OverGoal, EmptyDay, Czech } = composeStories(stories)

describe('CalorieRing', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('is an accessible calorie meter', async () => {
    await OnTrack.run()
    const meter = screen.getByRole('meter', { name: 'Calories' })

    expect(meter).toHaveAttribute('aria-valuenow', '1650')
    expect(meter).toHaveAttribute('aria-valuemax', '2200')
    expect(plainSpaces(meter.getAttribute('aria-valuetext'))).toBe('1,650 kcal of 2,200 kcal')
  })

  it('shows what is left of the goal', async () => {
    await OnTrack.run()

    expect(plainSpaces(screen.getByText(/remaining/).textContent)).toBe('550 kcal remaining')
  })

  it('switches to the "over" state above the goal', async () => {
    await OverGoal.run()

    expect(plainSpaces(screen.getByText(/over/).textContent)).toBe('180 kcal over')
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '2200')
  })

  it('handles an empty day', async () => {
    await EmptyDay.run()

    expect(plainSpaces(screen.getByText(/remaining/).textContent)).toBe('2,200 kcal remaining')
  })

  it('is translated and formatted in Czech', async () => {
    await Czech.run()

    expect(await screen.findByRole('meter', { name: 'Kalorie' })).toBeInTheDocument()
    expect(plainSpaces(screen.getByText(/zbývá/).textContent)).toBe('zbývá 550 kcal')
    expect(plainSpaces(screen.getByText('1 650', { normalizer: plainSpaces }).textContent)).toBe(
      '1 650',
    )
  })
})
