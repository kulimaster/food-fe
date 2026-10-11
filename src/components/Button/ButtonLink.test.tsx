import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as stories from './ButtonLink.stories'

const { Primary, SecondaryWithIcon } = composeStories(stories)

describe('ButtonLink', () => {
  it('is a link (not a button) with button styling', () => {
    render(<Primary />)
    const link = screen.getByRole('link', { name: 'Go to dashboard' })

    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveClass('bg-primary', 'rounded-lg')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('keeps the icon decorative', () => {
    render(<SecondaryWithIcon />)

    expect(screen.getByRole('link', { name: 'Back' })).toHaveClass('border-primary')
  })
})
