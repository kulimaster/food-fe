import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectField } from './SelectField'

const meta = {
  title: 'Components/Field/SelectField',
  component: SelectField,
  args: {
    label: 'Meal',
    defaultValue: 'lunch',
    children: (
      <>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = { args: { hint: 'Where this food goes in today’s log.' } }

export const WithError: Story = {
  args: { defaultValue: '', error: 'Choose a meal.', required: true },
}

export const Disabled: Story = { args: { disabled: true } }
