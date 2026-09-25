import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon } from './Icon'
import * as stories from './Icon.stories'
import { icons } from './icons'

const { Gallery } = composeStories(stories)

describe('Icon', () => {
  it('is decorative (hidden from screen readers) without a label', () => {
    const { container } = render(<Icon name="search" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('is an accessible image when labelled', () => {
    render(<Icon name="search" label="Search" />)

    expect(screen.getByRole('img', { name: 'Search' })).toBeInTheDocument()
  })

  it('applies size and extra classes', () => {
    const { container } = render(<Icon name="add" size="sm" className="text-primary" />)

    expect(container.querySelector('svg')).toHaveClass('size-4', 'text-primary')
  })

  it('renders the filled variant when available, outlined otherwise', () => {
    const { container: filled } = render(<Icon name="favorite" filled />)
    const { container: outlined } = render(<Icon name="favorite" />)
    const { container: fallback } = render(<Icon name="search" filled />)
    const path = (c: HTMLElement) => c.querySelector('path')?.getAttribute('d')

    expect(path(filled)).not.toBe(path(outlined))
    expect(fallback.querySelector('svg')).toBeInTheDocument()
  })

  it('gallery renders every registered icon', async () => {
    await Gallery.run()

    for (const name of Object.keys(icons)) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
