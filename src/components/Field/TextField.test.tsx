import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TextField } from './TextField'
import * as stories from './TextField.stories'

const { Default, WithUnit, WithHint, WithError, Required } = composeStories(stories)

describe('TextField', () => {
  it('is labelled and accepts typing', async () => {
    render(<Default />)
    const input = screen.getByLabelText('Ingredient name')

    await userEvent.type(input, 'Oats')

    expect(input).toHaveValue('Oats')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('shows the unit without making it part of the label', () => {
    render(<WithUnit />)

    expect(screen.getByLabelText('Amount')).toHaveValue(120)
    expect(screen.getByText('g')).toHaveAttribute('aria-hidden', 'true')
  })

  it('describes the input with its hint', () => {
    render(<WithHint />)

    expect(screen.getByLabelText('Daily calorie goal')).toHaveAccessibleDescription(
      'Leave empty to calculate it.',
    )
  })

  it('marks the input invalid and describes it with the error', () => {
    render(<WithError />)
    const input = screen.getByLabelText('Weight')

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Weight must be a positive number.')
  })

  it('marks required fields', () => {
    render(<Required />)

    expect(screen.getByLabelText(/Ingredient name/)).toBeRequired()
  })

  it('passes refs and props through (for React Hook Form)', () => {
    let element: HTMLInputElement | null = null
    render(
      <TextField
        label="Name"
        name="name"
        ref={(node) => {
          element = node
        }}
      />,
    )

    expect(element).toBe(screen.getByLabelText('Name'))
    expect(screen.getByLabelText('Name')).toHaveAttribute('name', 'name')
  })

  it('keeps a custom id', () => {
    render(<TextField label="Name" id="custom" hint="Hint" />)

    expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'custom')
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-describedby', 'custom-hint')
  })
})
