import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import { Icon } from '@/components/Icon'
import { cx } from '@/lib/cx'
import { navItems } from '../navigation'
import { Logo } from './Logo'

/** Desktop navigation: logo and every screen, as in the desktop prototype. */
export function Sidebar({ className }: { className?: string }) {
  const { t } = useTranslation()

  return (
    <aside
      className={cx(
        'sticky top-0 h-dvh w-72 shrink-0 flex-col gap-xl bg-surface-container-low px-md py-lg',
        className,
      )}
    >
      <div className="px-sm">
        <Logo />
      </div>
      <nav aria-label={t('nav.main')}>
        <ul className="flex flex-col gap-xs">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cx(
                    'flex items-center gap-md rounded-lg px-md py-sm text-label-md transition-colors',
                    'outline-primary focus-visible:outline-2 focus-visible:outline-offset-2',
                    isActive
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
                  )
                }
              >
                <Icon name={item.icon} />
                {t(`nav.${item.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
