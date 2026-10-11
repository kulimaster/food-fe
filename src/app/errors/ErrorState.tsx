import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { Page } from '@/components/Page'

export interface ErrorStateProps {
  icon: IconName
  title: string
  text: string
  /** Buttons / links offering a way out */
  actions: ReactNode
}

/** Shared look of error screens (404, unexpected error): icon, heading, explanation, actions. */
export function ErrorState({ icon, title, text, actions }: ErrorStateProps) {
  return (
    <Page title={title}>
      <div className="flex flex-col items-start gap-lg">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon name={icon} size="xl" />
        </span>
        <p className="max-w-prose text-body-lg text-on-surface-variant">{text}</p>
        <div className="flex flex-wrap gap-md">{actions}</div>
      </div>
    </Page>
  )
}
