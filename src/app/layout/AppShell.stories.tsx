import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { Card } from '@/components/Card'
import { CalorieRing } from '@/components/Macro'
import { Page } from '@/components/Page'
import { AppShell } from './AppShell'

function DemoPage() {
  return (
    <Page title="Dashboard">
      <Card className="flex justify-center">
        <CalorieRing consumed={1650} goal={2200} />
      </Card>
    </Page>
  )
}

/** The real shell inside an in-memory router; any URL shows the demo page. */
function ShellAt({ path }: { path: string }) {
  const [router] = useState(() =>
    createMemoryRouter(
      [
        {
          path: '/',
          Component: AppShell,
          children: [
            { index: true, Component: DemoPage },
            { path: '*', Component: DemoPage },
          ],
        },
      ],
      { initialEntries: [path] },
    ),
  )
  return <RouterProvider router={router} />
}

const meta = {
  title: 'App/AppShell',
  component: ShellAt,
  parameters: { layout: 'fullscreen' },
  args: { path: '/' },
} satisfies Meta<typeof ShellAt>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = { globals: { viewport: { value: 'desktop' } } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile' } } }

/** "More" is highlighted when one of its screens is open */
export const MobileOnProfile: Story = {
  args: { path: '/profile' },
  globals: { viewport: { value: 'mobile' } },
}

export const DesktopCzech: Story = { globals: { viewport: { value: 'desktop' }, locale: 'cs' } }
