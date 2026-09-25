import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'
import * as stories from './Card.stories'

const { Default } = composeStories(stories)

describe('Card', () => {
  it('renders its content with the card surface and default padding', () => {
    render(<Default />)
    const card = screen.getByText('Macros').parentElement

    expect(card).toHaveClass('bg-surface-container-lowest', 'shadow-card', 'rounded-lg', 'p-lg')
  })

  it('renders the requested semantic element', () => {
    render(
      <Card as="section" aria-label="Daily snapshot">
        x
      </Card>,
    )

    expect(screen.getByRole('region', { name: 'Daily snapshot' }).tagName).toBe('SECTION')
  })

  it('can drop the padding', () => {
    render(<Card padding="none">content</Card>)

    expect(screen.getByText('content')).not.toHaveClass('p-lg')
  })
})
