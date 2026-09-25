import { type ComponentProps, useId } from 'react'
import { cx } from '@/lib/cx'
import { FieldShell } from './FieldShell'
import { controlClasses, describedBy } from './fieldUtils'

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'children'> {
  label: string
  hint?: string
  /** Error message (already translated); marks the input invalid */
  error?: string
  /** Unit shown inside the input on the right, e.g. "g", "kcal", "kg" */
  unit?: string
  /** Classes for the wrapper (layout), not the input */
  className?: string
}

/**
 * Labelled text/number input with hint and error. Spread React Hook Form's `register()` into it.
 */
export function TextField({
  label,
  hint,
  error,
  unit,
  className,
  id: idProp,
  required,
  ...inputProps
}: TextFieldProps) {
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
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cx(controlClasses, unit && 'pr-14')}
          {...inputProps}
        />
        {unit && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-md flex items-center text-body-md text-on-surface-variant"
          >
            {unit}
          </span>
        )}
      </div>
    </FieldShell>
  )
}
