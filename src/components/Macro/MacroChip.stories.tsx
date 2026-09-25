import type { Meta, StoryObj } from '@storybook/react-vite'
import { MacroChip } from './MacroChip'

const meta = {
  title: 'Components/Macro/MacroChip',
  component: MacroChip,
  args: { nutrient: 'protein', amount: 12 },
  argTypes: {
    nutrient: { control: 'inline-radio', options: ['protein', 'carbs', 'fat', 'fiber'] },
  },
} satisfies Meta<typeof MacroChip>

export default meta
type Story = StoryObj<typeof meta>

export const Protein: Story = {}

export const AllNutrients: Story = {
  render: () => (
    <div className="flex gap-sm">
      <MacroChip nutrient="protein" amount={12} />
      <MacroChip nutrient="carbs" amount={65} />
      <MacroChip nutrient="fat" amount={14} />
      <MacroChip nutrient="fiber" amount={8.5} />
    </div>
  ),
}

export const AllNutrientsCzech: Story = { ...AllNutrients, globals: { locale: 'cs' } }
