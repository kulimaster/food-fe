import { describe, expect, it } from 'vitest'
import { parseEnv } from './env'

describe('parseEnv', () => {
  it('returns the validated variables', () => {
    expect(parseEnv({ VITE_API_URL: 'http://localhost:5201', OTHER: 'x' })).toEqual({
      VITE_API_URL: 'http://localhost:5201',
    })
  })

  it('throws when VITE_API_URL is missing', () => {
    expect(() => parseEnv({})).toThrow(/VITE_API_URL/)
  })

  it('throws when VITE_API_URL is not a URL', () => {
    expect(() => parseEnv({ VITE_API_URL: 'localhost' })).toThrow(/VITE_API_URL/)
  })
})
