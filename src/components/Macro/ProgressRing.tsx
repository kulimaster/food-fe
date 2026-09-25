import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

const radius = 40
const circumference = 2 * Math.PI * radius

export interface ProgressRingProps {
  /** 0–1 */
  ratio: number
  /** Color of the progress arc as a text color class (the arc uses currentColor) */
  colorClass: string
  /** Size classes of the ring, e.g. `size-40` */
  sizeClass: string
  /** Stroke width in viewBox units (ring is 100×100) */
  strokeWidth?: number
  /** Content centered inside the ring */
  children?: ReactNode
}

/** Circular progress (visual only – the parent provides the accessible meter). */
export function ProgressRing({
  ratio,
  colorClass,
  sizeClass,
  strokeWidth = 8,
  children,
}: ProgressRingProps) {
  return (
    <div className={cx('relative shrink-0', sizeClass)}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-surface-container-highest"
        />
        {ratio > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - ratio)}
            className={cx(
              'transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none',
              colorClass,
            )}
          />
        )}
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
      )}
    </div>
  )
}
