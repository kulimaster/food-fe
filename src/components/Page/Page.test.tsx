import { composeStories } from '@storybook/react-vite'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as stories from './Page.stories'

const { Default, WithActions } = composeStories(stories)

describe('Page', () => {
  it('renders the title as the only h1 and sets the document title', async () => {
    render(<Default />)

    expect(screen.getByRole('heading', { level: 1, name: 'Recipes' })).toBeInTheDocument()
    await waitFor(() => {
      expect(document.title).toBe('Recipes · NutriPlan')
    })
  })

  it('renders actions next to the title', () => {
    render(<WithActions />)

    expect(screen.getByRole('button', { name: 'New recipe' })).toBeInTheDocument()
  })
})
