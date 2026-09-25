import { Children, type ReactNode, useId } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/Button'
import { Card } from '@/components/Card'
import { Icon } from '@/components/Icon'
import { MacroChip, type Nutrient } from '@/components/Macro'
import { useFormatters } from '@/i18n/format'
import { type MealSlot, mealSlotIcons } from './mealSlots'

export interface MealGroupProps {
  slot: MealSlot
  /** Sum of the meal's kcal (computed by the caller) */
  totalKcal: number
  /** Optional macro totals in grams, shown as chips */
  macros?: Partial<Record<Nutrient, number>>
  /** Adds food to this meal; shows the add button (or the whole empty row) */
  onAdd?: () => void
  /** `LogItem`s; with none the group collapses to an "Add …" row */
  children?: ReactNode
  className?: string
}

function SlotIcon({ slot }: { slot: MealSlot }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon name={mealSlotIcons[slot]} filled />
    </span>
  )
}

/** One meal of the day (breakfast, lunch…) with its logged foods, total and macros. */
export function MealGroup({ slot, totalKcal, macros, onAdd, children, className }: MealGroupProps) {
  const { t } = useTranslation()
  const format = useFormatters()
  const headingId = useId()
  const isEmpty = Children.count(children) === 0

  if (isEmpty && onAdd) {
    return (
      <Card as="section" padding="none" className={className} aria-label={t(`mealSlots.${slot}`)}>
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center gap-md rounded-lg p-md text-left text-label-md text-on-surface-variant outline-primary transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <SlotIcon slot={slot} />
          <span className="flex-1">{t(`mealLog.addTo.${slot}`)}</span>
          <Icon name="add" />
        </button>
      </Card>
    )
  }

  const macroEntries = Object.entries(macros ?? {}) as [Nutrient, number][]

  return (
    <Card as="section" padding="md" aria-labelledby={headingId} className={className}>
      <header className="flex items-center gap-md">
        <SlotIcon slot={slot} />
        <h3 id={headingId} className="flex-1 text-label-md text-on-surface">
          {t(`mealSlots.${slot}`)}
        </h3>
        <span className="text-label-md whitespace-nowrap text-primary">
          {format.energy(totalKcal)}
        </span>
        {onAdd && (
          <IconButton
            icon="add_circle"
            label={t(`mealLog.addTo.${slot}`)}
            size="sm"
            onClick={onAdd}
          />
        )}
      </header>
      {!isEmpty && <ul className="mt-xs ml-14 divide-y divide-divider">{children}</ul>}
      {macroEntries.length > 0 && (
        <div className="mt-sm ml-14 flex flex-wrap gap-sm">
          {macroEntries.map(([nutrient, grams]) => (
            <MacroChip key={nutrient} nutrient={nutrient} amount={grams} />
          ))}
        </div>
      )}
    </Card>
  )
}
