/**
 * English texts – the reference for keys and types (see i18next.d.ts).
 * Every key must also exist in cs.ts; plural keys use the i18next suffixes (_one, _other, …).
 */
export const en = {
  app: {
    comingSoon: 'Coming soon.',
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
