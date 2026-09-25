import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { LogItem } from './LogItem'

const meta = {
  title: 'Components/MealLog/LogItem',
  component: LogItem,
  args: { name: 'Oatmeal with Berries & Almonds', kcal: 320, amount: '80 g' },
  decorators: [
    (Story) => (
      <ul className="w-80 rounded-lg bg-surface-container-lowest px-md">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof LogItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Removable: Story = { args: { onRemove: fn() } }

export const WithoutAmount: Story = { args: { name: 'Black Coffee', kcal: 5, amount: undefined } }

export const LongName: Story = {
  args: { name: 'Grilled Chicken Salad with Avocado, Quinoa and Lemon Dressing', kcal: 680 },
}
