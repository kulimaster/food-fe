import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/Button'
import { Page } from './Page'

const meta = {
  title: 'Components/Page',
  component: Page,
  parameters: { layout: 'padded' },
  args: {
    title: 'Recipes',
    children: <p className="text-body-md text-on-surface-variant">Page content goes here.</p>,
  },
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActions: Story = {
  args: { actions: <Button iconStart="add">New recipe</Button> },
}
