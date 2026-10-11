import { useTranslation } from 'react-i18next'
import { Page } from '@/components/Page'

export function IngredientsPage() {
  const { t } = useTranslation()

  return (
    <Page title={t('nav.ingredients')}>
      <p className="text-body-md text-on-surface-variant">{t('app.comingSoon')}</p>
    </Page>
  )
}
