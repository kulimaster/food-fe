import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '@/test/router'
import { paths } from './navigation'

describe('routes', () => {
  it.each([
    [paths.dashboard, 'Dashboard'],
    [paths.logMeal, 'Log meal'],
    [paths.planner, 'Planner'],
    [paths.shoppingList, 'Shopping list'],
    [paths.recipes, 'Recipes'],
    [paths.newRecipe, 'New recipe'],
    [paths.recipe('42'), 'Edit recipe'],
    [paths.ingredients, 'Ingredients'],
    [paths.activity, 'Activity'],
    [paths.profile, 'Profile'],
  ])('%s shows the "%s" screen with a matching document title', async (path, title) => {
    renderRoute(path)

    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    await waitFor(() => {
      expect(document.title).toBe(`${title} · NutriPlan`)
    })
  })

  it('encodes recipe ids in paths', () => {
    expect(paths.recipe('a b/c')).toBe('/recipes/a%20b%2Fc')
  })
})
