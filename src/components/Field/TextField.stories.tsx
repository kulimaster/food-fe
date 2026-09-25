import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './TextField'

const meta = {
  title: 'Components/Field/TextField',
  component: TextField,
  args: { label: 'Ingredient name', placeholder: 'e.g. Rolled oats' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithUnit: Story = {
  args: { label: 'Amount', type: 'number', inputMode: 'decimal', unit: 'g', defaultValue: 120 },
}

export const WithHint: Story = {
  args: { label: 'Daily calorie goal', unit: 'kcal', hint: 'Leave empty to calculate it.' },
}

export const WithError: Story = {
  args: {
    label: 'Weight',
    unit: 'kg',
    type: 'number',
    defaultValue: -3,
    error: 'Weight must be a positive number.',
  },
}

export const Required: Story = { args: { required: true } }

export const Disabled: Story = { args: { disabled: true, defaultValue: 'Rolled oats' } }
