import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormatters } from './format'

/**
 * Shared texts and locale formatting. Switch the language in the toolbar (globe icon).
 */
const meta = {
  title: 'Foundations/i18n',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-lg border-b border-divider py-sm text-body-md">
      <code className="text-label-sm text-on-surface-variant">{label}</code>
      <span className="text-on-surface">{children}</span>
    </div>
  )
}

function Overview() {
  const { t, i18n } = useTranslation()
  const format = useFormatters()
  const date = new Date(2026, 9, 25, 8, 30)

  return (
    <div className="flex max-w-2xl flex-col gap-xl">
      <section>
        <h2 className="mb-sm text-headline-md text-on-surface">
          {t('language.label')}: {i18n.resolvedLanguage}
        </h2>
        {(['calories', 'protein', 'carbs', 'fat', 'fiber'] as const).map((macro) => (
          <Row key={macro} label={`macros.${macro}`}>
            {t(`macros.${macro}`)}
          </Row>
        ))}
        {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((slot) => (
          <Row key={slot} label={`mealSlots.${slot}`}>
            {t(`mealSlots.${slot}`)}
          </Row>
        ))}
      </section>
      <section>
        <h2 className="mb-sm text-headline-md text-on-surface">Plurals</h2>
        {[0, 1, 3, 5].map((count) => (
          <Row key={count} label={`items (count ${String(count)})`}>
            {t('items', { count })}
          </Row>
        ))}
      </section>
      <section>
        <h2 className="mb-sm text-headline-md text-on-surface">Formatting</h2>
        <Row label="energy(1850.4)">{format.energy(1850.4)}</Row>
        <Row label="mass(12.54)">{format.mass(12.54)}</Row>
        <Row label="number(1850.46)">{format.number(1850.46)}</Row>
        <Row label="percent(0.734)">{format.percent(0.734)}</Row>
        <Row label="shortDate">{format.shortDate(date)}</Row>
        <Row label="longDate">{format.longDate(date)}</Row>
        <Row label="time">{format.time(date)}</Row>
      </section>
    </div>
  )
}

export const English: Story = {
  render: () => <Overview />,
}

export const Czech: Story = {
  globals: { locale: 'cs' },
  render: () => <Overview />,
}
