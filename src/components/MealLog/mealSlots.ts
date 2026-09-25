import type { IconName } from '@/components/Icon'

/**
 * Meal slots of a day, in display order (backend enum `MealSlot`).
 * Replace with the generated API type once the client exists (phase 4).
 */
export const mealSlots = ['breakfast', 'lunch', 'dinner', 'snack'] as const
export type MealSlot = (typeof mealSlots)[number]

/** Filled icon per slot, as in the prototype's food log */
export const mealSlotIcons = {
  breakfast: 'bakery_dining',
  lunch: 'lunch_dining',
  dinner: 'dinner_dining',
  snack: 'icecream',
} as const satisfies Record<MealSlot, IconName>
