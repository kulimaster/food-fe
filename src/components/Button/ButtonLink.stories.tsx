import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { ButtonLink } from './ButtonLink'

const meta = {
  title: 'Components/ButtonLink',
  component: ButtonLink,
  args: { to: '/', children: 'Go to dashboard', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ButtonLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const SecondaryWithIcon: Story = {
  args: { variant: 'secondary', iconStart: 'arrow_back', children: 'Back' },
}
