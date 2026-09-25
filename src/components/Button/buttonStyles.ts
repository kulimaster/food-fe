/** Classes shared by Button and IconButton. Radius is set by each component. */
export const buttonBaseClasses =
  'inline-flex shrink-0 items-center justify-center text-label-md whitespace-nowrap ' +
  'transition-colors outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

export const buttonVariantClasses = {
  /** Filled emerald – the main action of a screen or card */
  primary: 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant',
  /** Emerald outline – less urgent actions ("Add note") */
  secondary: 'border-2 border-primary text-primary hover:bg-primary/5',
  /** Text only – toolbars, cancel */
  ghost: 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
  /** Destructive actions */
  danger: 'bg-error text-on-error hover:bg-on-error-container',
} as const

export type ButtonVariant = keyof typeof buttonVariantClasses
