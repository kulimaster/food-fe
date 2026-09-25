import { type ComponentProps, useId } from 'react'
import { Icon } from '@/components/Icon'
import { cx } from '@/lib/cx'
import { FieldShell } from './FieldShell'
import { controlClasses, describedBy } from './fieldUtils'

export interface SelectFieldProps extends ComponentProps<'select'> {
  label: string
  hint?: string
  /** Error message (already translated); marks the select invalid */
  error?: string
  /** Classes for the wrapper (layout), not the select */
  className?: string
}

/**
 * Labelled native select (best on mobile and for accessibility). Pass `<option>`s as children;
 * spread React Hook Form's `register()` into it.
 */
export function SelectField({
  label,
  hint,
  error,
  className,
  id: idProp,
  required,
  children,
  ...selectProps
}: SelectFieldProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cx(controlClasses, 'cursor-pointer appearance-none pr-12')}
          {...selectProps}
        >
          {children}
        </select>
        <Icon
          name="keyboard_arrow_down"
          className="pointer-events-none absolute top-1/2 right-md -translate-y-1/2 text-on-surface-variant"
        />
      </div>
    </FieldShell>
  )
}
