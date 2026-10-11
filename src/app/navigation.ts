import type { IconName } from '@/components/Icon'

/** URL of every screen – link with these instead of hard-coded strings */
export const paths = {
  dashboard: '/',
  logMeal: '/log',
  planner: '/planner',
  shoppingList: '/shopping-list',
  recipes: '/recipes',
  newRecipe: '/recipes/new',
  recipe: (recipeId: string) => `/recipes/${encodeURIComponent(recipeId)}`,
  ingredients: '/ingredients',
  activity: '/activity',
  profile: '/profile',
} as const

export interface NavItem {
  /** Translation key under `nav.` */
  key: 'dashboard' | 'planner' | 'shoppingList' | 'recipes' | 'ingredients' | 'activity' | 'profile'
  path: string
  icon: IconName
  /** Mobile: in the bottom bar, or inside the "More" menu (desktop sidebar shows all) */
  mobile: 'bar' | 'more'
  /** Shorter label for the narrow mobile bar (translation key under `nav.`) */
  shortKey?: 'shoppingListShort'
}

/** Main navigation, in display order. Log meal is an action (FAB, "+" on meals), not a nav item. */
export const navItems: readonly NavItem[] = [
  { key: 'dashboard', path: paths.dashboard, icon: 'dashboard', mobile: 'bar' },
  { key: 'planner', path: paths.planner, icon: 'calendar_today', mobile: 'bar' },
  {
    key: 'shoppingList',
    path: paths.shoppingList,
    icon: 'shopping_cart',
    mobile: 'bar',
    shortKey: 'shoppingListShort',
  },
  { key: 'recipes', path: paths.recipes, icon: 'menu_book', mobile: 'bar' },
  { key: 'ingredients', path: paths.ingredients, icon: 'kitchen', mobile: 'more' },
  { key: 'activity', path: paths.activity, icon: 'fitness_center', mobile: 'more' },
  { key: 'profile', path: paths.profile, icon: 'person', mobile: 'more' },
]
