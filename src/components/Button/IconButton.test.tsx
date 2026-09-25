import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from './IconButton'
import * as stories from './IconButton.stories'

const { Ghost, FloatingAction } = composeStories(stories)

describe('IconButton', () => {
  it('is named by its label (and shows it as tooltip)', () => {
    render(<Ghost />)
    const button = screen.getByRole('button', { name: 'Notifications' })

    expect(button).toHaveAttribute('title', 'Notifications')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls onClick', async () => {
    const onClick = vi.fn()
    render(<IconButton icon="add" label="Log food" onClick={onClick} />)

    await userEvent.click(screen.getByRole('button', { name: 'Log food' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is round only when asked', () => {
    render(
      <>
        <Ghost />
        <FloatingAction />
      </>,
    )

    expect(screen.getByRole('button', { name: 'Notifications' })).toHaveClass('rounded-lg')
    expect(screen.getByRole('button', { name: 'Log food' })).toHaveClass('rounded-full')
  })
})
