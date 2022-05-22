import { test, expect } from '@playwright/test'
import config from '../playwright.config'
test('should navigate to the about page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('./')
  // Find an element with the text 'About Page' and click on it
  await page.click('text=About Page')
  // The new url should be "/about" (baseURL is used there)
  // await expect(page).to(config.use?.baseURL || 'fdsaf')
  // The new page should contain an h1 with "About Page"

  await expect(page.locator('h1')).toContainText('About Page')
})
