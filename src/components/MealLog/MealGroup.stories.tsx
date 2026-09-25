import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { LogItem } from './LogItem'
import { MealGroup } from './MealGroup'

const meta = {
  title: 'Components/MealLog/MealGroup',
  component: MealGroup,
  args: { slot: 'breakfast', totalKcal: 325, onAdd: fn() },
  argTypes: {
    slot: { control: 'inline-radio', options: ['breakfast', 'lunch', 'dinner', 'snack'] },
  },
  decorators: [
    (Story) => (
      <div className="w-[380px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MealGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Breakfast: Story = {
  render: (args) => (
    <MealGroup {...args}>
      <LogItem name="Oatmeal with Berries" kcal={310} amount="80 g" onRemove={fn()} />
      <LogItem name="Black Coffee" kcal={5} amount="250 ml" onRemove={fn()} />
    </MealGroup>
  ),
}

export const WithMacros: Story = {
  args: { slot: 'lunch', totalKcal: 680, macros: { protein: 48, carbs: 55, fat: 22 } },
  render: (args) => (
    <MealGroup {...args}>
      <LogItem name="Grilled Chicken Salad w/ Avocado" kcal={450} amount="350 g" />
      <LogItem name="Quinoa Side" kcal={230} amount="1 cup" />
    </MealGroup>
  ),
}

/** Nothing logged yet: the group collapses into an "Add …" row */
export const Empty: Story = { args: { slot: 'dinner', totalKcal: 0 } }

/** "Today's Log" from the mobile dashboard prototype */
export const TodaysLog: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <MealGroup slot="breakfast" totalKcal={420} onAdd={fn()}>
        <LogItem name="Oatmeal with Berries" kcal={310} onRemove={fn()} />
        <LogItem name="Black Coffee" kcal={5} onRemove={fn()} />
      </MealGroup>
      <MealGroup slot="lunch" totalKcal={650} onAdd={fn()}>
        <LogItem name="Grilled Chicken Salad" kcal={450} onRemove={fn()} />
        <LogItem name="Olive Oil Dressing" kcal={120} onRemove={fn()} />
      </MealGroup>
      <MealGroup slot="dinner" totalKcal={0} onAdd={fn()} />
      <MealGroup slot="snack" totalKcal={0} onAdd={fn()} />
    </div>
  ),
}

export const TodaysLogCzech: Story = { ...TodaysLog, globals: { locale: 'cs' } }
