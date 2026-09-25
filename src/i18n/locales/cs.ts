/**
 * Czech texts. Keys must match en.ts (checked by locales.test.ts).
 * Czech plurals: _one (1), _few (2–4), _many (fractions), _other (0, 5+).
 */
export const cs = {
  app: {
    comingSoon: 'Připravujeme.',
  },
  status: {
    loading: 'Načítání…',
  },
  language: {
    label: 'Jazyk',
    cs: 'Čeština',
    en: 'English',
  },
  macros: {
    calories: 'Kalorie',
    protein: 'Bílkoviny',
    carbs: 'Sacharidy',
    fat: 'Tuky',
    fiber: 'Vláknina',
  },
  calories: {
    remaining: 'zbývá {{value}}',
    over: '{{value}} navíc',
  },
  progress: {
    ofGoal: '{{value}} z {{goal}}',
  },
  macrosShort: {
    protein: 'B',
    carbs: 'S',
    fat: 'T',
    fiber: 'V',
  },
  mealSlots: {
    breakfast: 'Snídaně',
    lunch: 'Oběd',
    dinner: 'Večeře',
    snack: 'Svačina',
  },
  mealLog: {
    addTo: {
      breakfast: 'Přidat snídani',
      lunch: 'Přidat oběd',
      dinner: 'Přidat večeři',
      snack: 'Přidat svačinu',
    },
    remove: 'Odebrat {{name}}',
  },
  items_one: '{{count}} položka',
  items_few: '{{count}} položky',
  items_many: '{{count}} položky',
  items_other: '{{count}} položek',
}
