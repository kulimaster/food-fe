import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import * as stories from './Button.stories'

const { Primary, Loading, Disabled, WithIcon } = composeStories(stories)

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button {...Primary.args} onClick={onClick} />)

    await userEvent.click(screen.getByRole('button', { name: 'Log food' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button')
  })

  it('can be a submit button', () => {
    render(<Button type="submit">Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit')
  })

  it('is disabled and busy while loading, and announces it', async () => {
    const onClick = vi.fn()
    render(<Button {...Loading.args} onClick={onClick} />)
    const button = screen.getByRole('button', { name: /Log food/ })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status', { name: 'Loading…' })).toBeInTheDocument()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not react when disabled', async () => {
    const onClick = vi.fn()
    render(<Button {...Disabled.args} onClick={onClick} />)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('keeps icons decorative so the text is the accessible name', () => {
    render(<WithIcon />)

    expect(screen.getByRole('button', { name: 'Log food' })).toBeInTheDocument()
  })
})
