import { useTranslation } from 'react-i18next'
import { Page } from '@/components/Page'

export function PlannerPage() {
  const { t } = useTranslation()

  return (
    <Page title={t('nav.planner')}>
      <p className="text-body-md text-on-surface-variant">{t('app.comingSoon')}</p>
    </Page>
  )
}
