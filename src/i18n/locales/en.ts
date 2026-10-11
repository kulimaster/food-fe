/**
 * English texts – the reference for keys and types (see i18next.d.ts).
 * Every key must also exist in cs.ts; plural keys use the i18next suffixes (_one, _other, …).
 */
export const en = {
  app: {
    comingSoon: 'Coming soon.',
  },
  nav: {
    dashboard: 'Dashboard',
    logMeal: 'Log meal',
    planner: 'Planner',
    shoppingList: 'Shopping list',
    shoppingListShort: 'Shopping',
    recipes: 'Recipes',
    newRecipe: 'New recipe',
    editRecipe: 'Edit recipe',
    ingredients: 'Ingredients',
    activity: 'Activity',
    profile: 'Profile',
    more: 'More',
    main: 'Main navigation',
    skipToContent: 'Skip to content',
    home: 'NutriPlan – dashboard',
  },
  errors: {
    notFound: {
      title: 'Page not found',
      text: 'The page you are looking for does not exist or has been moved.',
    },
    generic: {
      title: 'Something went wrong',
      text: 'An unexpected error occurred. Try again, or go back to the dashboard.',
    },
    retry: 'Try again',
    backToDashboard: 'Go to dashboard',
  },
  status: {
    loading: 'Loading…',
  },
  language: {
    label: 'Language',
    cs: 'Čeština',
    en: 'English',
  },
  macros: {
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    fiber: 'Fiber',
  },
  calories: {
    remaining: '{{value}} remaining',
    over: '{{value}} over',
  },
  progress: {
    ofGoal: '{{value}} of {{goal}}',
  },
  macrosShort: {
    protein: 'P',
    carbs: 'C',
    fat: 'F',
    fiber: 'Fb',
  },
  mealSlots: {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
  },
  mealLog: {
    addTo: {
      breakfast: 'Add breakfast',
      lunch: 'Add lunch',
      dinner: 'Add dinner',
      snack: 'Add snack',
    },
    remove: 'Remove {{name}}',
  },
  items_one: '{{count}} item',
  items_other: '{{count}} items',
}
