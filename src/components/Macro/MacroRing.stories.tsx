import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '@/components/Card'
import { CalorieRing } from './CalorieRing'
import { MacroRing } from './MacroRing'

const meta = {
  title: 'Components/Macro/MacroRing',
  component: MacroRing,
  args: { nutrient: 'protein', consumed: 120, goal: 150 },
  argTypes: {
    nutrient: { control: 'inline-radio', options: ['protein', 'carbs', 'fat', 'fiber'] },
  },
} satisfies Meta<typeof MacroRing>

export default meta
type Story = StoryObj<typeof meta>

export const Protein: Story = {}

/** The daily summary card from the mobile dashboard prototype */
export const MobileSummary: Story = {
  globals: { viewport: { value: 'mobile' } },
  render: () => (
    <Card className="flex w-[358px] flex-col gap-lg">
      <CalorieRing consumed={1850} goal={2400} size="md" />
      <div className="flex justify-around">
        <MacroRing nutrient="protein" consumed={120} goal={150} />
        <MacroRing nutrient="carbs" consumed={180} goal={250} />
        <MacroRing nutrient="fat" consumed={45} goal={70} />
      </div>
    </Card>
  ),
}

export const MobileSummaryCzech: Story = { ...MobileSummary, globals: { locale: 'cs' } }
