import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import * as stories from './SelectField.stories'

const { Default, WithError } = composeStories(stories)

describe('SelectField', () => {
  it('is labelled and selectable', async () => {
    render(<Default />)
    const select = screen.getByLabelText('Meal')

    expect(select).toHaveValue('lunch')
    await userEvent.selectOptions(select, 'dinner')
    expect(select).toHaveValue('dinner')
  })

  it('marks the select invalid and describes it with the error', () => {
    render(<WithError />)
    const select = screen.getByLabelText(/Meal/)

    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAccessibleDescription('Choose a meal.')
    expect(select).toBeRequired()
  })
})
