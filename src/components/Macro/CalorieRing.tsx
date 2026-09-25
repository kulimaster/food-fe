import { useTranslation } from 'react-i18next'
import { useFormatters } from '@/i18n/format'
import { cx } from '@/lib/cx'
import { macroClasses, progressRatio } from './macros'
import { ProgressRing } from './ProgressRing'

const sizeClasses = {
  md: 'size-32', // 128px – mobile summary
  lg: 'size-40', // 160px – dashboard (prototype)
} as const

export interface CalorieRingProps {
  /** kcal eaten today */
  consumed: number
  /** Daily goal in kcal (including activity eat-back) */
  goal: number
  size?: keyof typeof sizeClasses
  /** Show the "550 kcal remaining" / "120 kcal over" line under the ring */
  showRemaining?: boolean
  className?: string
}

/** Daily calories: ring with eaten / goal, and what's left (or how much over). */
export function CalorieRing({
  consumed,
  goal,
  size = 'lg',
  showRemaining = true,
  className,
}: CalorieRingProps) {
  const { t } = useTranslation()
  const format = useFormatters()
  const isOver = consumed > goal
  const difference = format.energy(Math.abs(goal - consumed))

  return (
    <div className={cx('flex flex-col items-center gap-md', className)}>
      <div
        role="meter"
        aria-label={t('macros.calories')}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(consumed, goal)}
        aria-valuetext={t('progress.ofGoal', {
          value: format.energy(consumed),
          goal: format.energy(goal),
        })}
      >
        <ProgressRing
          ratio={progressRatio(consumed, goal)}
          colorClass={isOver ? 'text-error' : macroClasses.calories.stroke}
          sizeClass={sizeClasses[size]}
        >
          <span
            className={cx(
              'text-on-surface',
              size === 'lg' ? 'text-headline-lg' : 'text-headline-md',
            )}
          >
            {format.number(Math.round(consumed))}
          </span>
          <span className="text-label-sm text-on-surface-variant">/ {format.energy(goal)}</span>
        </ProgressRing>
      </div>
      {showRemaining && (
        <p
          className={cx(
            'rounded-lg px-sm py-xs text-label-md',
            isOver ? 'bg-error-container text-on-error-container' : 'bg-primary/10 text-primary',
          )}
        >
          {isOver
            ? t('calories.over', { value: difference })
            : t('calories.remaining', { value: difference })}
        </p>
      )}
    </div>
  )
}
