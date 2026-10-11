import { Link, type LinkProps } from 'react-router'
import { Icon, type IconName } from '@/components/Icon'
import { cx } from '@/lib/cx'
import {
  buttonBaseClasses,
  type ButtonSize,
  buttonSizeClasses,
  type ButtonVariant,
  buttonVariantClasses,
} from './buttonStyles'

export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
  iconStart?: IconName
}

/** Navigation that looks like a button (e.g. "Go to dashboard"). It is a link for assistive tech. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  iconStart,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cx(
        buttonBaseClasses,
        'rounded-lg',
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className,
      )}
      {...rest}
    >
      {iconStart && <Icon name={iconStart} size={size === 'sm' ? 'md' : 'lg'} />}
      {children}
    </Link>
  )
}
