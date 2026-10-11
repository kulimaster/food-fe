import { render, screen } from '@testing-library/react'
import { createMemoryRouter, type RouteObject } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRoute } from '@/test/router'
import { AppShell } from '../layout/AppShell'
import { AppError, RouteError } from './RouteError'

function Broken(): never {
  throw new Error('Boom')
}

function renderRouter(routes: RouteObject[]) {
  const router = createMemoryRouter(routes, { initialEntries: ['/'] })
  return render(<RouterProvider router={router} />)
}

describe('error handling', () => {
  // Expected errors are logged by React and by RouteError – keep the test output clean
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows "Page not found" for an unknown URL, inside the app shell', async () => {
    renderRoute('/does-not-exist')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to dashboard' })).toHaveAttribute('href', '/')
    expect(screen.getAllByRole('navigation', { name: 'Main navigation' }).length).toBeGreaterThan(0)
  })

  it('a failing screen shows the error but keeps the navigation', async () => {
    renderRouter([
      {
        path: '/',
        Component: AppShell,
        children: [{ ErrorBoundary: RouteError, children: [{ index: true, Component: Broken }] }],
      },
    ])

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to dashboard' })).toBeInTheDocument()
    expect(screen.getAllByRole('navigation', { name: 'Main navigation' }).length).toBeGreaterThan(0)
    expect(console.error).toHaveBeenCalledWith(expect.objectContaining({ message: 'Boom' }))
  })

  it('"Try again" reloads the page', async () => {
    const reload = vi.fn()
    vi.spyOn(window, 'location', 'get').mockReturnValue({ reload } as unknown as Location)
    renderRouter([{ path: '/', ErrorBoundary: RouteError, Component: Broken }])

    ;(await screen.findByRole('button', { name: 'Try again' })).click()

    expect(reload).toHaveBeenCalledOnce()
  })

  it('a failing shell falls back to a full-page error', async () => {
    renderRouter([{ path: '/', ErrorBoundary: AppError, Component: Broken }])

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('error texts are translated', async () => {
    const { i18n } = await import('@/i18n')
    await i18n.changeLanguage('cs')
    renderRoute('/neexistuje')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Stránka nenalezena' }),
    ).toBeInTheDocument()
  })
})
