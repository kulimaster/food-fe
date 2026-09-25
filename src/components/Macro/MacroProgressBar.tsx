import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormatters } from '@/i18n/format'
import { cx } from '@/lib/cx'
import { macroClasses, type Nutrient, progressRatio } from './macros'

export interface MacroProgressBarProps {
  nutrient: Nutrient
  /** grams eaten today */
  consumed: number
  /** daily goal in grams */
  goal: number
  className?: string
}

/** One nutrient's progress towards its daily goal: label, "110 / 150 g" and a pill bar. */
export function MacroProgressBar({ nutrient, consumed, goal, className }: MacroProgressBarProps) {
  const { t } = useTranslation()
  const format = useFormatters()
  const labelId = useId()
  const colors = macroClasses[nutrient]

  return (
    <div className={cx('flex flex-col gap-xs', className)}>
      <div className="flex items-baseline justify-between gap-sm">
        <span id={labelId} className={cx('text-label-md', colors.text)}>
          {t(`macros.${nutrient}`)}
        </span>
        <span className="text-body-md text-on-surface-variant" aria-hidden="true">
          {format.number(consumed)} / {format.mass(goal)}
        </span>
      </div>
      <div
        role="meter"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(consumed, goal)}
        aria-valuetext={t('progress.ofGoal', {
          value: format.mass(consumed),
          goal: format.mass(goal),
        })}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest"
      >
        <div
          className={cx(
            'h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none',
            colors.fill,
          )}
          style={{ width: `${String(progressRatio(consumed, goal) * 100)}%` }}
        />
      </div>
    </div>
  )
}
