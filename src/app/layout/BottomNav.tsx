import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router'
import { Icon, type IconName } from '@/components/Icon'
import { cx } from '@/lib/cx'
import { navItems } from '../navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

const barItems = navItems.filter((item) => item.mobile === 'bar')
const moreItems = navItems.filter((item) => item.mobile === 'more')

const tabClasses = (isActive: boolean) =>
  cx(
    'flex h-16 flex-1 flex-col items-center justify-center gap-xs rounded-lg text-label-sm transition-colors',
    'outline-primary focus-visible:outline-2 focus-visible:-outline-offset-2',
    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface',
  )

function TabContent({ icon, label, active }: { icon: IconName; label: string; active: boolean }) {
  return (
    <>
      <span
        className={cx(
          'flex h-8 w-14 items-center justify-center rounded-full transition-colors',
          active && 'bg-primary/10',
        )}
      >
        <Icon name={icon} filled={active} />
      </span>
      {label}
    </>
  )
}

/** Mobile navigation: four tabs plus a "More" menu for the remaining screens. */
export function BottomNav({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  // The menu remembers the page it was opened on, so navigating anywhere closes it
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const moreOpen = openedOn === pathname
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const isMoreActive = moreItems.some((item) => pathname.startsWith(item.path))

  // Close on Escape and on a click outside
  useEffect(() => {
    if (!moreOpen) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenedOn(null)
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenedOn(null)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [moreOpen])

  return (
    <nav
      aria-label={t('nav.main')}
      className={cx(
        'fixed inset-x-0 bottom-0 z-40 bg-surface-container-lowest pb-[env(safe-area-inset-bottom)] shadow-floating',
        className,
      )}
    >
      <div ref={containerRef} className="relative mx-auto flex max-w-content gap-xs px-sm">
        {barItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => tabClasses(isActive)}
          >
            {({ isActive }) => (
              <TabContent
                icon={item.icon}
                label={t(`nav.${item.shortKey ?? item.key}`)}
                active={isActive}
              />
            )}
          </NavLink>
        ))}
        <button
          type="button"
          aria-expanded={moreOpen}
          aria-controls={menuId}
          onClick={() => {
            setOpenedOn(moreOpen ? null : pathname)
          }}
          className={tabClasses(isMoreActive)}
        >
          <TabContent icon="more_horiz" label={t('nav.more')} active={isMoreActive} />
        </button>
        {moreOpen && (
          <div
            id={menuId}
            className="absolute right-sm bottom-full mb-sm flex w-64 flex-col gap-sm rounded-lg bg-surface-container-lowest p-sm shadow-floating"
          >
            <ul className="flex flex-col gap-xs">
              {moreItems.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cx(
                        'flex items-center gap-md rounded-lg px-md py-sm text-label-md transition-colors',
                        'outline-primary focus-visible:outline-2 focus-visible:-outline-offset-2',
                        isActive
                          ? 'bg-primary-container text-on-primary-container'
                          : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface',
                      )
                    }
                  >
                    <Icon name={item.icon} />
                    {t(`nav.${item.key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="border-t border-divider px-xs pt-sm">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
