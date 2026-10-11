import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

export const appName = 'NutriPlan'

export interface PageProps {
  /** Translated page title – shown as the `<h1>` and in the browser tab ("Planner · NutriPlan") */
  title: string
  /** Actions shown next to the title (e.g. an "Add" button) */
  actions?: ReactNode
  children?: ReactNode
  className?: string
}

/** Top-level content of a screen: document title, page heading and content. */
export function Page({ title, actions, children, className }: PageProps) {
  return (
    <div className={cx('flex flex-col gap-lg', className)}>
      <title>{`${title} · ${appName}`}</title>
      <header className="flex items-center justify-between gap-md">
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">{title}</h1>
        {actions}
      </header>
      {children}
    </div>
  )
}
