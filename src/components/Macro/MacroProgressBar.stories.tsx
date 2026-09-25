import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '@/components/Card'
import { MacroProgressBar } from './MacroProgressBar'

const meta = {
  title: 'Components/Macro/MacroProgressBar',
  component: MacroProgressBar,
  args: { nutrient: 'protein', consumed: 110, goal: 150 },
  argTypes: {
    nutrient: { control: 'inline-radio', options: ['protein', 'carbs', 'fat', 'fiber'] },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MacroProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Protein: Story = {}

export const OverGoal: Story = { args: { nutrient: 'carbs', consumed: 290, goal: 250 } }

/** The "Macros" card from the desktop dashboard prototype */
export const MacrosCard: Story = {
  render: () => (
    <Card>
      <h3 className="mb-md text-headline-md text-on-surface">Macros</h3>
      <div className="flex flex-col gap-md">
        <MacroProgressBar nutrient="protein" consumed={110} goal={150} />
        <MacroProgressBar nutrient="carbs" consumed={180} goal={250} />
        <MacroProgressBar nutrient="fat" consumed={45} goal={70} />
        <MacroProgressBar nutrient="fiber" consumed={22} goal={30} />
      </div>
    </Card>
  ),
}

export const MacrosCardCzech: Story = { ...MacrosCard, globals: { locale: 'cs' } }
