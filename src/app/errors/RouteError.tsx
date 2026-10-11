import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Button, ButtonLink } from '@/components/Button'
import { paths } from '../navigation'
import { ErrorState } from './ErrorState'
import { NotFoundPage } from './NotFoundPage'

/**
 * Error boundary for screens: a thrown 404 shows "Page not found", anything else a generic
 * message with "Try again" (reloads – also fixes a screen chunk that failed to download after a
 * deploy) and a way back to the dashboard.
 */
export function RouteError() {
  const { t } = useTranslation()
  const error = useRouteError()

  useEffect(() => {
    // Until error reporting (phase 7) exists, at least keep the error visible in the console
    console.error(error)
  }, [error])

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  return (
    <ErrorState
      icon="error"
      title={t('errors.generic.title')}
      text={t('errors.generic.text')}
      actions={
        <>
          <Button
            iconStart="refresh"
            onClick={() => {
              window.location.reload()
            }}
          >
            {t('errors.retry')}
          </Button>
          <ButtonLink to={paths.dashboard} variant="secondary">
            {t('errors.backToDashboard')}
          </ButtonLink>
        </>
      }
    />
  )
}

/** Last-resort boundary when the app shell itself fails: same message, full page, no navigation. */
export function AppError() {
  return (
    <main className="mx-auto max-w-content p-container-padding md:py-xl">
      <RouteError />
    </main>
  )
}
