import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Log food',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = { args: { variant: 'secondary', children: 'Add note' } }

export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } }

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete', iconStart: 'delete' },
}

export const WithIcon: Story = { args: { iconStart: 'add' } }

export const Loading: Story = { args: { loading: true } }

export const Disabled: Story = { args: { disabled: true } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-md">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-md">
      <Button {...args} variant="primary" iconStart="add">
        Log food
      </Button>
      <Button {...args} variant="secondary">
        Add note
      </Button>
      <Button {...args} variant="ghost">
        Cancel
      </Button>
      <Button {...args} variant="danger" iconStart="delete">
        Delete
      </Button>
    </div>
  ),
}

export const FullWidthOnMobile: Story = {
  args: { fullWidth: true, iconStart: 'add' },
  globals: { viewport: { value: 'mobile' } },
  parameters: { layout: 'padded' },
}
