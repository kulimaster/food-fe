import type { ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { cx } from '@/lib/cx'

export interface FieldShellProps {
  id: string
  label: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  className?: string | undefined
  children: ReactNode
}

/** Label, hint and error message around a form control (internal to Field components). */
export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cx('flex flex-col gap-xs', className)}>
      <label htmlFor={id} className="ml-xs text-label-md text-on-surface-variant">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-xs text-error">
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="ml-xs text-label-sm text-on-surface-variant">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="ml-xs flex items-center gap-xs text-label-sm text-error">
          <Icon name="error" size="sm" />
          {error}
        </p>
      )}
    </div>
  )
}
