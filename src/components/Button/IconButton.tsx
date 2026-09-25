import type { ComponentProps } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { cx } from '@/lib/cx'
import { buttonBaseClasses, type ButtonVariant, buttonVariantClasses } from './buttonStyles'

const sizeClasses = {
  sm: 'size-9', // 36px
  md: 'size-11', // 44px – minimum comfortable touch target
  lg: 'size-14', // 56px – floating action button
} as const

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  icon: IconName
  /** Required accessible name (icon-only buttons have no visible text) – also shown as tooltip */
  label: string
  variant?: ButtonVariant
  size?: keyof typeof sizeClasses
  /** Round instead of the default rounded-lg square */
  round?: boolean
  filled?: boolean
}

/** Icon-only button, e.g. search, notifications, delete, add (FAB). */
export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  round = false,
  filled = false,
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        sizeClasses[size],
        round ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={size === 'sm' ? 'md' : 'lg'} filled={filled} />
    </button>
  )
}
