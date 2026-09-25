import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { type Token, tokenProperties, tokensOf } from './tokens'

/**
 * Vitality Core design tokens, read directly from `src/styles/theme.css`.
 * Source of truth for the rules behind them: `prototype/DESIGN.md`.
 */
const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-xl">
      <h2 className="mb-md text-headline-md text-on-surface">{title}</h2>
      {children}
    </section>
  )
}

function TokenLabel({ token, prefix }: { token: Token; prefix: string }) {
  return (
    <div className="text-label-sm">
      <code className="text-on-surface">
        {prefix}-{token.name}
      </code>
      <div className="text-on-surface-variant">{token.value}</div>
      {token.comment && <div className="text-on-surface-variant italic">{token.comment}</div>}
    </div>
  )
}

/** Group colors by their role: `inverse-on-surface` → surface, `macro-fat` → macro */
function colorGroup(name: string): string {
  return name.replace(/^(inverse-)?(on-)?/, '').split('-')[0] ?? name
}

export const Colors: Story = {
  render: () => {
    const groups = new Map<string, Token[]>()
    for (const token of tokensOf('color')) {
      const group = colorGroup(token.name)
      groups.set(group, [...(groups.get(group) ?? []), token])
    }
    return (
      <>
        {[...groups].map(([group, tokens]) => (
          <Section key={group} title={group}>
            <div className="grid grid-cols-2 gap-md sm:grid-cols-4 lg:grid-cols-6">
              {tokens.map((token) => (
                <div key={token.name} className="flex flex-col gap-sm">
                  <div
                    className="h-16 rounded-md border border-border"
                    style={{ backgroundColor: token.value }}
                  />
                  <TokenLabel token={token} prefix="color" />
                </div>
              ))}
            </div>
          </Section>
        ))}
      </>
    )
  },
}

export const Typography: Story = {
  render: () => (
    <Section title="Type scale (Inter)">
      <div className="flex flex-col gap-lg">
        {tokensOf('text').map((token) => {
          const properties = tokenProperties(`text-${token.name}`)
          return (
            <div key={token.name} className="flex flex-col gap-xs">
              <span
                className="text-on-surface"
                style={{
                  fontSize: token.value,
                  lineHeight: properties['line-height'],
                  fontWeight: properties['font-weight'],
                  letterSpacing: properties['letter-spacing'],
                }}
              >
                1,850 kcal · Daily Calorie Balance
              </span>
              <code className="text-label-sm text-on-surface-variant">
                text-{token.name} · {token.value} / {properties['line-height']} ·{' '}
                {properties['font-weight']}
                {properties['letter-spacing'] && ` · ${properties['letter-spacing']}`}
              </code>
            </div>
          )
        })}
      </div>
    </Section>
  ),
}

export const Radius: Story = {
  render: () => (
    <Section title="Border radius">
      <div className="flex flex-wrap gap-lg">
        {tokensOf('radius').map((token) => (
          <div key={token.name} className="flex w-32 flex-col gap-sm">
            <div className="h-20 bg-primary-container" style={{ borderRadius: token.value }} />
            <TokenLabel token={token} prefix="rounded" />
          </div>
        ))}
      </div>
    </Section>
  ),
}

export const Shadows: Story = {
  parameters: { backgrounds: { value: 'background' } },
  render: () => (
    <Section title="Elevation">
      <div className="flex flex-wrap gap-xl">
        {tokensOf('shadow').map((token) => (
          <div key={token.name} className="flex w-56 flex-col gap-md">
            <div
              className="h-28 rounded-lg bg-surface-container-lowest"
              style={{ boxShadow: token.value }}
            />
            <TokenLabel token={token} prefix="shadow" />
          </div>
        ))}
      </div>
    </Section>
  ),
}

export const Spacing: Story = {
  render: () => (
    <Section title="Spacing (4px base)">
      <div className="flex flex-col gap-sm">
        {tokensOf('spacing').map((token) => (
          <div key={token.name} className="flex items-center gap-md">
            <div className="h-4 rounded-sm bg-tertiary" style={{ width: token.value }} />
            <TokenLabel token={token} prefix="spacing" />
          </div>
        ))}
      </div>
    </Section>
  ),
}
