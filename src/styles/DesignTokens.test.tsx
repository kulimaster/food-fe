import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as stories from './DesignTokens.stories'

const { Colors, Typography, Radius, Shadows, Spacing } = composeStories(stories)

describe('DesignTokens stories', () => {
  it('lists every color group including macros', async () => {
    await Colors.run()

    for (const group of ['surface', 'primary', 'secondary', 'tertiary', 'error', 'macro']) {
      expect(screen.getByRole('heading', { name: group })).toBeInTheDocument()
    }
    expect(screen.getByText('color-macro-fiber')).toBeInTheDocument()
  })

  it.each([
    ['Typography', Typography, 'text-display-lg'],
    ['Radius', Radius, 'rounded-lg'],
    ['Shadows', Shadows, 'shadow-card'],
    ['Spacing', Spacing, 'spacing-md'],
  ] as const)('%s renders its tokens', (_name, Story, expectedToken) => {
    render(<Story />)

    expect(screen.getByText(expectedToken, { exact: false })).toBeInTheDocument()
  })
})
