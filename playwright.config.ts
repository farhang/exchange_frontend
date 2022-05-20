import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run start',
        url: 'http://localhost:3000/',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000'
    }
}
export default config
