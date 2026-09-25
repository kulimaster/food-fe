import type { SVGProps } from 'react'
import { cx } from '@/lib/cx'
import { filledIcons, type IconName, icons } from './icons'

const sizeClasses = {
  sm: 'size-4', // 16px
  md: 'size-5', // 20px
  lg: 'size-6', // 24px – default, as in the prototype
  xl: 'size-8', // 32px
} as const

export type IconSize = keyof typeof sizeClasses

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'ref'> {
  name: IconName
  size?: IconSize
  /** Filled variant; falls back to outlined if the icon has none registered */
  filled?: boolean
  /**
   * Accessible name. Without it the icon is decorative and hidden from screen readers –
   * the surrounding element (e.g. a button) must then provide the name.
   */
  label?: string
}

/** Material Symbols icon. Color follows the text color (`currentColor`). */
export function Icon({ name, size = 'lg', filled = false, label, className, ...rest }: IconProps) {
  const Svg = (filled ? filledIcons[name] : undefined) ?? icons[name]

  return (
    <Svg
      fill="currentColor"
      focusable="false"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      className={cx('shrink-0', sizeClasses[size], className)}
      {...rest}
    />
  )
}
