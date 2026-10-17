import { defineConfig, devices } from "@playwright/test"

const PORT = 4173
const external = process.env.E2E_BASE_URL

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: external ?? `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
    locale: "es-AR",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 850 } } },
    { name: "android", use: { ...devices["Pixel 7"] } },
  ],
  // Contra producción (E2E_BASE_URL) no se levanta servidor local.
  webServer: external
    ? undefined
    : {
        command: `npm run build && npx vite preview --host 127.0.0.1 --port ${PORT} --strictPort`,
        url: `http://127.0.0.1:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
