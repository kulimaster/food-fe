import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('announces the translated loading status by default', () => {
    render(<Spinner />)

    expect(screen.getByRole('status', { name: 'Loading…' })).toBeInTheDocument()
  })

  it('uses a custom label', () => {
    render(<Spinner label="Saving recipe" />)

    expect(screen.getByRole('status', { name: 'Saving recipe' })).toBeInTheDocument()
  })

  it('is hidden from screen readers when decorative', () => {
    const { container } = render(<Spinner label={null} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })
})
