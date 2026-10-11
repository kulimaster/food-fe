import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AppShell } from '../layout/AppShell'
import { NotFoundPage } from './NotFoundPage'
import { RouteError } from './RouteError'

function Broken(): never {
  throw new Error('Demo error')
}

/** Error screens inside the real app shell */
function ErrorAt({ kind }: { kind: 'notFound' | 'error' }) {
  const [router] = useState(() =>
    createMemoryRouter([
      {
        path: '/',
        Component: AppShell,
        children: [
          {
            ErrorBoundary: RouteError,
            children: [{ index: true, Component: kind === 'error' ? Broken : NotFoundPage }],
          },
        ],
      },
    ]),
  )
  return <RouterProvider router={router} />
}

const meta = {
  title: 'App/Errors',
  component: ErrorAt,
  parameters: { layout: 'fullscreen' },
  args: { kind: 'notFound' },
} satisfies Meta<typeof ErrorAt>

export default meta
type Story = StoryObj<typeof meta>

export const NotFound: Story = {}

export const UnexpectedError: Story = { args: { kind: 'error' } }

export const UnexpectedErrorCzech: Story = { args: { kind: 'error' }, globals: { locale: 'cs' } }
