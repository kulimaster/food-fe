import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { plainSpaces } from '@/test/text'
import { LogItem } from './LogItem'
import * as stories from './LogItem.stories'

const { Default, WithoutAmount } = composeStories(stories)

describe('LogItem', () => {
  it('shows name, portion and formatted kcal as a list item', async () => {
    await Default.run()

    expect(screen.getByRole('listitem')).toHaveTextContent('Oatmeal with Berries & Almonds')
    expect(screen.getByText('80 g')).toBeInTheDocument()
    expect(screen.getByText('320 kcal', { normalizer: plainSpaces })).toBeInTheDocument()
  })

  it('has no remove button unless removable', async () => {
    await WithoutAmount.run()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('removes the item with a button named after the food', async () => {
    const onRemove = vi.fn()
    render(
      <ul>
        <LogItem name="Black Coffee" kcal={5} onRemove={onRemove} />
      </ul>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Remove Black Coffee' }))

    expect(onRemove).toHaveBeenCalledOnce()
  })
})
