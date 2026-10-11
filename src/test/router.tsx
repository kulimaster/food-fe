import { render } from '@testing-library/react'
import { createMemoryRouter, type RouteObject } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { routes } from '@/app/routes'

/**
 * Fresh copy of the route tree. React Router writes resolved `lazy` results back onto the route
 * objects, so routers created from the same objects (one per test) would affect each other.
 */
function cloneRoutes(source: RouteObject[]): RouteObject[] {
  return source.map((route) => {
    const copy: RouteObject = { ...route }
    if (route.lazy && typeof route.lazy === 'object') {
      copy.lazy = { ...route.lazy }
    }
    if (route.children) {
      copy.children = cloneRoutes(route.children)
    }
    return copy
  })
}

/** Renders the whole app (real routes) at the given URL, without a browser history. */
export function renderRoute(path: string) {
  const router = createMemoryRouter(cloneRoutes(routes), { initialEntries: [path] })
  return { router, ...render(<RouterProvider router={router} />) }
}
