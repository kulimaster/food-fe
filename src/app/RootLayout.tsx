import { Outlet } from 'react-router'

/** Frame around every screen (replaced by the full app shell with navigation). */
export function RootLayout() {
  return (
    <main className="mx-auto max-w-content p-container-padding">
      <Outlet />
    </main>
  )
}
