import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { filledIcons, type IconName, icons } from './icons'

const iconNames = Object.keys(icons) as IconName[]

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'restaurant', size: 'lg', filled: false },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-lg text-on-surface">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

/** Icons take the current text color */
export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-lg">
      <Icon {...args} className="text-primary" />
      <Icon {...args} className="text-macro-protein" />
      <Icon {...args} className="text-macro-carbs" />
      <Icon {...args} className="text-on-surface-variant" />
    </div>
  ),
}

/** Meal slot icons, filled as in the prototype's food log */
export const Filled: Story = {
  render: (args) => (
    <div className="flex gap-lg text-primary">
      {(Object.keys(filledIcons) as IconName[]).map((name) => (
        <Icon key={name} {...args} name={name} filled />
      ))}
    </div>
  ),
}

/** Every registered icon */
export const Gallery: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="grid grid-cols-3 gap-md sm:grid-cols-6">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-xs text-on-surface">
          <Icon {...args} name={name} />
          <code className="text-label-sm text-on-surface-variant">{name}</code>
        </div>
      ))}
    </div>
  ),
}
