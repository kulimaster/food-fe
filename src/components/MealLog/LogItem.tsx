import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/Button'
import { useFormatters } from '@/i18n/format'
import { cx } from '@/lib/cx'

export interface LogItemProps {
  /** Food, recipe or favorite name */
  name: string
  /** Energy of this entry in kcal */
  kcal: number
  /** Portion, already formatted – e.g. "120 g", "1 cup" */
  amount?: string
  /** Shows a remove button (always visible on touch screens, on hover/focus otherwise) */
  onRemove?: () => void
  className?: string
}

/** One logged food in a meal: name, portion and kcal. Renders an `<li>`. */
export function LogItem({ name, kcal, amount, onRemove, className }: LogItemProps) {
  const { t } = useTranslation()
  const format = useFormatters()

  return (
    <li className={cx('group flex min-h-12 items-center gap-sm py-sm', className)}>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-body-md text-on-surface">{name}</span>
        {amount && <span className="text-label-sm text-on-surface-variant">{amount}</span>}
      </div>
      <span className="text-label-md whitespace-nowrap text-on-surface-variant">
        {format.energy(kcal)}
      </span>
      {onRemove && (
        <IconButton
          icon="delete"
          label={t('mealLog.remove', { name })}
          size="sm"
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100"
        />
      )}
    </li>
  )
}
