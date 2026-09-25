import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'

const sizeClasses = { sm: 'size-4', md: 'size-5', lg: 'size-8' } as const

export interface SpinnerProps {
  size?: keyof typeof sizeClasses
  /** Accessible name; defaults to the translated "Loading…". Pass `null` when decorative. */
  label?: string | null
  className?: string
}

/** Indeterminate loading indicator. Color follows the text color. */
export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  const { t } = useTranslation()
  const name = label === null ? undefined : (label ?? t('status.loading'))

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cx('animate-spin motion-reduce:animate-none', sizeClasses[size], className)}
      {...(name ? { role: 'status', 'aria-label': name } : { 'aria-hidden': true })}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
