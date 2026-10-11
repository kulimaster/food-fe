import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { appName } from '@/components/Page'
import { paths } from '../navigation'

/** Logo mark + name, linking to the dashboard. */
export function Logo() {
  const { t } = useTranslation()

  return (
    <Link
      to={paths.dashboard}
      aria-label={t('nav.home')}
      className="flex items-center gap-sm rounded-lg outline-primary focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <img src="/apple-touch-icon.png" alt="" className="size-9 rounded-md shadow-card" />
      <span className="text-headline-md text-primary">{appName}</span>
    </Link>
  )
}
