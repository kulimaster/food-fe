import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { IconButton } from './IconButton'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: 'notifications',
    label: 'Notifications',
    variant: 'ghost',
    size: 'md',
    round: false,
    filled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Ghost: Story = {}

/** Round primary "add" button, as the floating action in the food log */
export const FloatingAction: Story = {
  args: { icon: 'add', label: 'Log food', variant: 'primary', size: 'lg', round: true },
}

export const Delete: Story = {
  args: { icon: 'delete', label: 'Remove item', variant: 'ghost', size: 'sm' },
}

export const Toolbar: Story = {
  render: (args) => (
    <div className="flex items-center gap-xs">
      <IconButton {...args} icon="search" label="Search" />
      <IconButton {...args} icon="notifications" label="Notifications" />
      <IconButton {...args} icon="more_vert" label="More options" />
    </div>
  ),
}
