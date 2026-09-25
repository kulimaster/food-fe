/** Nutrients tracked per day. Each has one fixed color that is never reused for anything else. */
export const nutrients = ['protein', 'carbs', 'fat', 'fiber'] as const
export type Nutrient = (typeof nutrients)[number]

/** Calories plus the nutrients – everything that has a macro color */
export type MacroKey = 'calories' | Nutrient

/**
 * Tailwind classes per macro, written out in full so Tailwind can find them.
 * - `fill` / `stroke`: bars and rings (base color)
 * - `text`: readable text color (≥ 4.5:1)
 * - `tint`: 10 % background for chips
 */
export const macroClasses = {
  calories: {
    fill: 'bg-macro-calories',
    stroke: 'text-macro-calories',
    text: 'text-macro-calories-strong',
    tint: 'bg-macro-calories/10',
  },
  protein: {
    fill: 'bg-macro-protein',
    stroke: 'text-macro-protein',
    text: 'text-macro-protein-strong',
    tint: 'bg-macro-protein/10',
  },
  carbs: {
    fill: 'bg-macro-carbs',
    stroke: 'text-macro-carbs',
    text: 'text-macro-carbs-strong',
    tint: 'bg-macro-carbs/10',
  },
  fat: {
    fill: 'bg-macro-fat',
    stroke: 'text-macro-fat',
    text: 'text-macro-fat-strong',
    tint: 'bg-macro-fat/10',
  },
  fiber: {
    fill: 'bg-macro-fiber',
    stroke: 'text-macro-fiber',
    text: 'text-macro-fiber-strong',
    tint: 'bg-macro-fiber/10',
  },
} as const satisfies Record<MacroKey, Record<'fill' | 'stroke' | 'text' | 'tint', string>>

/** Share of the goal reached, clamped to 0–1 (a goal of 0 counts as reached) */
export function progressRatio(value: number, goal: number): number {
  if (goal <= 0) {
    return value > 0 ? 1 : 0
  }
  return Math.min(Math.max(value / goal, 0), 1)
}
