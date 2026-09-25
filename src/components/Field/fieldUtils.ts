import { cx } from '@/lib/cx'

/** Shared look of text inputs and selects (white, level-1 shadow, rounded-lg, clear focus ring) */
export const controlClasses =
  'h-12 w-full rounded-lg bg-surface-container-lowest px-md text-body-md text-on-surface ' +
  'shadow-card outline-none transition-shadow placeholder:text-on-surface-variant/80 ' +
  'focus-visible:ring-2 focus-visible:ring-primary ' +
  'aria-invalid:ring-2 aria-invalid:ring-error ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

/** IDs of the hint and error texts, for the control's aria-describedby */
export function describedBy(id: string, hint?: string, error?: string): string | undefined {
  return cx(hint && `${id}-hint`, error && `${id}-error`) || undefined
}
