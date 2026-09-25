import type { HTMLAttributes } from 'react'
import { cx } from '@/lib/cx'

const paddingClasses = {
  none: '',
  md: 'p-md',
  lg: 'p-lg', // DESIGN.md: data cards default to 24px
} as const

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Semantic element: `section` for a titled block, `article` for a standalone item, `li` in lists */
  as?: 'div' | 'section' | 'article' | 'li'
  padding?: keyof typeof paddingClasses
}

/** White surface with level-1 elevation – the base container for logs and macro summaries. */
export function Card({ as: Element = 'div', padding = 'lg', className, ...rest }: CardProps) {
  return (
    <Element
      className={cx(
        'rounded-lg bg-surface-container-lowest shadow-card',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    />
  )
}
