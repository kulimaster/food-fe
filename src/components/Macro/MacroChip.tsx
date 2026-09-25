import { useTranslation } from 'react-i18next'
import { useFormatters } from '@/i18n/format'
import { cx } from '@/lib/cx'
import { macroClasses, type Nutrient } from './macros'

export interface MacroChipProps {
  nutrient: Nutrient
  /** grams */
  amount: number
  className?: string
}

/** Small tinted label like "12 g P" (screen readers hear "12 g Protein"). */
export function MacroChip({ nutrient, amount, className }: MacroChipProps) {
  const { t } = useTranslation()
  const format = useFormatters()
  const colors = macroClasses[nutrient]
  const grams = format.mass(amount)

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-sm px-sm py-xs text-label-sm whitespace-nowrap',
        colors.tint,
        colors.text,
        className,
      )}
    >
      <span aria-hidden="true">
        {grams} {t(`macrosShort.${nutrient}`)}
      </span>
      <span className="sr-only">
        {grams} {t(`macros.${nutrient}`)}
      </span>
    </span>
  )
}
