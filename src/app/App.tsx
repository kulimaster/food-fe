import { useTranslation } from 'react-i18next'

export function App() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-content p-container-padding">
      <div className="rounded-lg bg-surface-container-lowest p-lg shadow-card">
        <h1 className="text-headline-lg text-primary">NutriPlan</h1>
        <p className="mt-sm text-body-md text-on-surface-variant">{t('app.comingSoon')}</p>
      </div>
    </main>
  )
}
