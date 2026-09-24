import { z } from 'zod'

const envSchema = z.object({
  /** Base URL of the food-be REST API, e.g. http://localhost:5201 */
  VITE_API_URL: z.url(),
})

export type Env = z.infer<typeof envSchema>

export function parseEnv(raw: Record<string, unknown>): Env {
  const result = envSchema.safeParse(raw)
  if (!result.success) {
    throw new Error(
      `Invalid environment variables (see .env.example):\n${z.prettifyError(result.error)}`,
    )
  }
  return result.data
}

/** Validated environment. Importing this module fails fast on missing or invalid variables. */
export const env = parseEnv(import.meta.env)
