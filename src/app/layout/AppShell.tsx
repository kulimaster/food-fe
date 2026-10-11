import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { BottomNav } from './BottomNav'
import { Logo } from './Logo'
import { Sidebar } from './Sidebar'

/**
 * App frame: desktop sidebar (≥ md) or mobile top bar + bottom navigation, around the current
 * screen. After client-side navigation, focus moves to the content so screen readers announce it.
 */
export function AppShell() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus()
  }, [pathname])

  return (
    <div className="min-h-dvh md:flex">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-primary px-md py-sm text-label-md text-on-primary focus:not-sr-only focus:fixed focus:top-sm focus:left-sm"
      >
        {t('nav.skipToContent')}
      </a>
      <Sidebar className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center bg-surface/80 px-container-padding backdrop-blur-xl md:hidden">
          <Logo />
        </header>
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className="mx-auto w-full max-w-content p-container-padding pb-28 outline-none md:py-xl"
        >
          <Outlet />
        </main>
      </div>
      <BottomNav className="md:hidden" />
      <ScrollRestoration />
    </div>
  )
}
