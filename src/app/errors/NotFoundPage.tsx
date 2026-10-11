import { useTranslation } from 'react-i18next'
import { ButtonLink } from '@/components/Button'
import { paths } from '../navigation'
import { ErrorState } from './ErrorState'

/** 404 – unknown URL (shown inside the app shell, so navigation stays available). */
export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <ErrorState
      icon="search"
      title={t('errors.notFound.title')}
      text={t('errors.notFound.text')}
      actions={
        <ButtonLink to={paths.dashboard} iconStart="dashboard">
          {t('errors.backToDashboard')}
        </ButtonLink>
      }
    />
  )
}
