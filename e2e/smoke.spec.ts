import { expect, test } from '@playwright/test'

test('app opens the dashboard', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Dashboard · NutriPlan')
  await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible()
})

test('deep links work (server falls back to the app)', async ({ page }) => {
  await page.goto('/recipes/new')

  await expect(page.getByRole('heading', { level: 1, name: 'New recipe' })).toBeVisible()
})
