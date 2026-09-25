import type { ComponentProps } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { Spinner } from '@/components/Spinner'
import { cx } from '@/lib/cx'
import { buttonBaseClasses, type ButtonVariant, buttonVariantClasses } from './buttonStyles'

const sizeClasses = {
  sm: 'h-9 gap-xs px-md',
  md: 'h-11 gap-sm px-lg', // 44px – minimum comfortable touch target
  lg: 'h-14 gap-sm px-xl',
} as const

export type ButtonSize = keyof typeof sizeClasses

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconStart?: IconName
  iconEnd?: IconName
  /** Shows a spinner, disables the button and marks it busy; keeps its width */
  loading?: boolean
  fullWidth?: boolean
}

/** Button. `className` is meant for layout (margins, width), not for restyling. */
export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  loading = false,
  fullWidth = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === 'sm' ? 'md' : 'lg'

  return (
    <button
      type={type}
      disabled={disabled === true || loading}
      aria-busy={loading || undefined}
      className={cx(
        buttonBaseClasses,
        'rounded-lg',
        buttonVariantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        loading && 'relative',
        className,
      )}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={size === 'sm' ? 'sm' : 'md'} />
        </span>
      )}
      <span className={cx('inline-flex items-center gap-[inherit]', loading && 'invisible')}>
        {iconStart && <Icon name={iconStart} size={iconSize} />}
        {children}
        {iconEnd && <Icon name={iconEnd} size={iconSize} />}
      </span>
    </button>
  )
}
