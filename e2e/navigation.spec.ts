import { expect, type Page, test } from '@playwright/test'

const heading = (page: Page, name: string) => page.getByRole('heading', { level: 1, name })

// Only the visible navigation is in the accessibility tree (sidebar on desktop, bar on mobile)
const mainNav = (page: Page) => page.getByRole('navigation', { name: 'Main navigation' })

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => isMobile, 'sidebar is desktop only')

  test('sidebar reaches every screen and marks the current one', async ({ page }) => {
    await page.goto('/')

    for (const name of [
      'Planner',
      'Shopping list',
      'Recipes',
      'Ingredients',
      'Activity',
      'Profile',
      'Dashboard',
    ]) {
      await mainNav(page).getByRole('link', { name }).click()
      await expect(heading(page, name)).toBeVisible()
      await expect(mainNav(page).getByRole('link', { name })).toHaveAttribute(
        'aria-current',
        'page',
      )
    }
  })
})

test.describe('mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'bottom bar is mobile only')

  test('bottom bar tabs and the "More" menu', async ({ page }) => {
    await page.goto('/')
    const nav = mainNav(page)

    await nav.getByRole('link', { name: 'Shopping' }).click()
    await expect(heading(page, 'Shopping list')).toBeVisible()

    const more = nav.getByRole('button', { name: 'More' })
    await more.click()
    await nav.getByRole('link', { name: 'Profile' }).click()
    await expect(heading(page, 'Profile')).toBeVisible()
    await expect(more).toHaveAttribute('aria-expanded', 'false')
  })
})

test('language switch translates the app and is remembered', async ({ page, isMobile }) => {
  await page.goto('/planner')
  if (isMobile) {
    await mainNav(page).getByRole('button', { name: 'More' }).click()
  }

  // The radio itself is visually hidden – click its visible label, as a user would
  await page.getByText('Čeština', { exact: true }).filter({ visible: true }).click()
  await expect(page.getByRole('radio', { name: 'Čeština' }).filter({ visible: true })).toBeChecked()

  await expect(heading(page, 'Plánovač')).toBeVisible()
  await expect(page).toHaveTitle('Plánovač · NutriPlan')
  await expect(page.locator('html')).toHaveAttribute('lang', 'cs')

  await page.reload()
  await expect(heading(page, 'Plánovač')).toBeVisible()
})

test('unknown URL shows 404 with a way back', async ({ page }) => {
  await page.goto('/this/does/not/exist')

  await expect(heading(page, 'Page not found')).toBeVisible()
  await page.getByRole('link', { name: 'Go to dashboard' }).click()
  await expect(heading(page, 'Dashboard')).toBeVisible()
})

test('skip link jumps to the content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard navigation')
  await page.goto('/')
  await expect(heading(page, 'Dashboard')).toBeVisible()

  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')

  await expect(page.getByRole('main')).toBeFocused()
})
