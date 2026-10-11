import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '@/test/router'

/** jsdom ignores media queries, so both the desktop sidebar and the mobile bar are rendered */
function navigations() {
  const [sidebar, bottomBar] = screen.getAllByRole('navigation', { name: 'Main navigation' })
  if (!sidebar || !bottomBar) {
    throw new Error('Expected the sidebar and the bottom navigation')
  }
  return { sidebar, bottomBar }
}

describe('AppShell', () => {
  it('desktop sidebar lists every screen and marks the current one', async () => {
    renderRoute('/planner')
    await screen.findByRole('heading', { level: 1, name: 'Planner' })
    const { sidebar } = navigations()

    for (const name of [
      'Dashboard',
      'Planner',
      'Shopping list',
      'Recipes',
      'Ingredients',
      'Activity',
      'Profile',
    ]) {
      expect(within(sidebar).getByRole('link', { name })).toBeInTheDocument()
    }
    expect(within(sidebar).getByRole('link', { name: 'Planner' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(sidebar).getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('keeps Recipes active on nested recipe screens', async () => {
    renderRoute('/recipes/new')
    await screen.findByRole('heading', { level: 1, name: 'New recipe' })

    expect(within(navigations().sidebar).getByRole('link', { name: 'Recipes' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('mobile bar shows four tabs and hides the rest behind "More"', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1, name: 'Dashboard' })
    const { bottomBar } = navigations()
    const more = within(bottomBar).getByRole('button', { name: 'More' })

    expect(within(bottomBar).getAllByRole('link')).toHaveLength(4)
    expect(more).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(more)

    expect(more).toHaveAttribute('aria-expanded', 'true')
    expect(within(bottomBar).getByRole('link', { name: 'Profile' })).toBeInTheDocument()
  })

  it('closes the "More" menu after navigating and on Escape', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1, name: 'Dashboard' })
    const { bottomBar } = navigations()
    const more = within(bottomBar).getByRole('button', { name: 'More' })

    await userEvent.click(more)
    await userEvent.click(within(bottomBar).getByRole('link', { name: 'Activity' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Activity' })).toBeInTheDocument()
    expect(more).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(more)
    await userEvent.keyboard('{Escape}')
    expect(more).toHaveAttribute('aria-expanded', 'false')
  })

  it('switching the language in the "More" menu translates the whole app', async () => {
    renderRoute('/planner')
    await screen.findByRole('heading', { level: 1, name: 'Planner' })
    const { sidebar, bottomBar } = navigations()

    expect(
      within(screen.getByRole('complementary')).getByRole('group', { name: 'Language' }),
    ).toBeInTheDocument()
    await userEvent.click(within(bottomBar).getByRole('button', { name: 'More' }))
    await userEvent.click(within(bottomBar).getByRole('radio', { name: 'Čeština' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Plánovač' })).toBeInTheDocument()
    expect(within(sidebar).getByRole('link', { name: 'Nákupní seznam' })).toBeInTheDocument()
    expect(within(bottomBar).getByRole('link', { name: 'Nákup' })).toBeInTheDocument()
    await waitFor(() => {
      expect(document.title).toBe('Plánovač · NutriPlan')
    })
  })

  it('offers a skip link to the main content', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1, name: 'Dashboard' })

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  })

  it('moves focus to the content after navigating', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1, name: 'Dashboard' })

    await userEvent.click(within(navigations().sidebar).getByRole('link', { name: 'Recipes' }))

    await screen.findByRole('heading', { level: 1, name: 'Recipes' })
    await waitFor(() => {
      expect(screen.getByRole('main')).toHaveFocus()
    })
  })
})
