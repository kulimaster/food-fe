import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { padding: 'lg', as: 'div' },
  argTypes: {
    padding: { control: 'inline-radio', options: ['none', 'md', 'lg'] },
    as: { control: 'inline-radio', options: ['div', 'section', 'article', 'li'] },
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <h3 className="text-headline-md text-on-surface">Macros</h3>
      <p className="mt-sm text-body-md text-on-surface-variant">
        Cards hold food logs and macro summaries.
      </p>
    </Card>
  ),
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CompactPadding: Story = { args: { padding: 'md' } }

export const AsSection: Story = { args: { as: 'section' } }
