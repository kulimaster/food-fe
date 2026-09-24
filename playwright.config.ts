import { defineConfig, devices } from '@playwright/test'

const port = 4173
const isCI = Boolean(process.env.CI)

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${String(port)}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  // E2E runs against the production build, not the dev server.
  // Binaries are called directly (not via `pnpm build`/`pnpm preview`): Playwright stops the server
  // by killing the spawned process tree, and an extra pnpm layer can leave `vite preview` running,
  // which keeps the run hanging after the tests finish (seen on Linux CI).
  webServer: {
    command: `tsc -b && vite build && vite preview --port ${String(port)} --strictPort`,
    url: `http://localhost:${String(port)}`,
    reuseExistingServer: !isCI,
    env: { VITE_API_URL: process.env.VITE_API_URL ?? 'http://localhost:5201' },
  },
})
