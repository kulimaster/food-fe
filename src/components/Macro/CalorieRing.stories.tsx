import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalorieRing } from './CalorieRing'

const meta = {
  title: 'Components/Macro/CalorieRing',
  component: CalorieRing,
  args: { consumed: 1650, goal: 2200, size: 'lg', showRemaining: true },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'lg'] } },
} satisfies Meta<typeof CalorieRing>

export default meta
type Story = StoryObj<typeof meta>

export const OnTrack: Story = {}

export const OverGoal: Story = { args: { consumed: 2380 } }

export const EmptyDay: Story = { args: { consumed: 0 } }

export const Medium: Story = { args: { size: 'md' } }

export const Czech: Story = { globals: { locale: 'cs' } }
