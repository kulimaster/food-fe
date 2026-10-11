import type { Meta, StoryObj } from '@storybook/react-vite'
import { LanguageSwitcher } from './LanguageSwitcher'

const meta = {
  title: 'App/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const English: Story = {}

export const Czech: Story = { globals: { locale: 'cs' } }
