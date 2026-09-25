import { useTranslation } from 'react-i18next'
import { useFormatters } from '@/i18n/format'
import { cx } from '@/lib/cx'
import { macroClasses, type Nutrient, progressRatio } from './macros'
import { ProgressRing } from './ProgressRing'

export interface MacroRingProps {
  nutrient: Nutrient
  /** grams eaten today */
  consumed: number
  /** daily goal in grams */
  goal: number
  className?: string
}

/** Compact nutrient progress: small ring with grams and name below (mobile dashboard). */
export function MacroRing({ nutrient, consumed, goal, className }: MacroRingProps) {
  const { t } = useTranslation()
  const format = useFormatters()
  const name = t(`macros.${nutrient}`)

  return (
    <div
      role="meter"
      aria-label={name}
      aria-valuemin={0}
      aria-valuemax={goal}
      aria-valuenow={Math.min(consumed, goal)}
      aria-valuetext={t('progress.ofGoal', {
        value: format.mass(consumed),
        goal: format.mass(goal),
      })}
      className={cx('flex flex-col items-center gap-sm', className)}
    >
      <ProgressRing
        ratio={progressRatio(consumed, goal)}
        colorClass={macroClasses[nutrient].stroke}
        sizeClass="size-16"
        strokeWidth={10}
      />
      <div className="flex flex-col items-center" aria-hidden="true">
        <span className="text-headline-md text-on-surface">{format.mass(consumed)}</span>
        <span className="text-label-sm text-on-surface-variant">{name}</span>
      </div>
    </div>
  )
}
