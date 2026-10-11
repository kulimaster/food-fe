import type { RouteObject } from 'react-router'
import { Spinner } from '@/components/Spinner'
import { AppError, RouteError } from './errors/RouteError'
import { NotFoundPage } from './errors/NotFoundPage'
import { AppShell } from './layout/AppShell'

/**
 * All routes. Screens are code-split: each is loaded the first time it's visited.
 * Paths must match `paths` in navigation.ts.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: AppShell,
    // The shell itself failed: full-page error without navigation
    ErrorBoundary: AppError,
    // Shown while the first screen's code loads
    hydrateFallbackElement: (
      <div className="flex min-h-dvh items-center justify-center text-primary">
        <Spinner size="lg" />
      </div>
    ),
    children: [
      {
        // A failing screen keeps the shell (navigation) and shows the error in the content area
        ErrorBoundary: RouteError,
        children: [
          {
            index: true,
            lazy: {
              Component: async () =>
                (await import('@/features/dashboard/DashboardPage')).DashboardPage,
            },
          },
          {
            path: 'log',
            lazy: {
              Component: async () => (await import('@/features/meals/LogMealPage')).LogMealPage,
            },
          },
          {
            path: 'planner',
            lazy: {
              Component: async () => (await import('@/features/planner/PlannerPage')).PlannerPage,
            },
          },
          {
            path: 'shopping-list',
            lazy: {
              Component: async () =>
                (await import('@/features/shopping-list/ShoppingListPage')).ShoppingListPage,
            },
          },
          {
            path: 'recipes',
            children: [
              {
                index: true,
                lazy: {
                  Component: async () =>
                    (await import('@/features/recipes/RecipesPage')).RecipesPage,
                },
              },
              {
                // 'new' and ':recipeId' share the recipe builder
                path: 'new',
                lazy: {
                  Component: async () =>
                    (await import('@/features/recipes/RecipeEditorPage')).RecipeEditorPage,
                },
              },
              {
                path: ':recipeId',
                lazy: {
                  Component: async () =>
                    (await import('@/features/recipes/RecipeEditorPage')).RecipeEditorPage,
                },
              },
            ],
          },
          {
            path: 'ingredients',
            lazy: {
              Component: async () =>
                (await import('@/features/ingredients/IngredientsPage')).IngredientsPage,
            },
          },
          {
            path: 'activity',
            lazy: {
              Component: async () =>
                (await import('@/features/activity/ActivityPage')).ActivityPage,
            },
          },
          {
            path: 'profile',
            lazy: {
              Component: async () => (await import('@/features/profile/ProfilePage')).ProfilePage,
            },
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
]
