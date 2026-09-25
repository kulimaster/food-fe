import { composeStories } from '@storybook/react-vite'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { i18n } from '@/i18n'
import { plainSpaces } from '@/test/text'
import { MealGroup } from './MealGroup'
import * as stories from './MealGroup.stories'

const { Breakfast, WithMacros, TodaysLog, TodaysLogCzech } = composeStories(stories)

describe('MealGroup', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('is a section named by the meal with its total and items', async () => {
    await Breakfast.run()
    const section = screen.getByRole('region', { name: 'Breakfast' })

    expect(within(section).getByText('325 kcal', { normalizer: plainSpaces })).toBeInTheDocument()
    expect(within(section).getAllByRole('listitem')).toHaveLength(2)
  })

  it('shows macro chips when totals are given', async () => {
    await WithMacros.run()

    expect(screen.getByText('48 g Protein', { normalizer: plainSpaces })).toBeInTheDocument()
    expect(screen.getByText('22 g Fat', { normalizer: plainSpaces })).toBeInTheDocument()
  })

  it('collapses an empty meal into an add button', async () => {
    const onAdd = vi.fn()
    render(<MealGroup slot="dinner" totalKcal={0} onAdd={onAdd} />)

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Add dinner' }))
    expect(onAdd).toHaveBeenCalledOnce()
  })

  it('offers adding more food to a filled meal', async () => {
    const onAdd = vi.fn()
    render(
      <MealGroup slot="lunch" totalKcal={450} onAdd={onAdd}>
        <li>Salad</li>
      </MealGroup>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Add lunch' }))
    expect(onAdd).toHaveBeenCalledOnce()
  })

  it("renders today's log with every meal", async () => {
    await TodaysLog.run()

    expect(screen.getByRole('region', { name: 'Breakfast' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Lunch' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add dinner' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add snack' })).toBeInTheDocument()
  })

  it('uses Czech meal names in the right grammatical case', async () => {
    await TodaysLogCzech.run()

    expect(await screen.findByRole('region', { name: 'Snídaně' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Přidat večeři' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Přidat svačinu' })).toBeInTheDocument()
  })
})
