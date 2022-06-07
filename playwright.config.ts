import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
  use: {
    baseURL:
      process.env.PLAYWRIGHT_TEST_BASE_URL ||
      'https://exchange-frontend-ifarhang.vercel.app/',
  },
}

export default config
