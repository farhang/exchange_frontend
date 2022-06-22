import { test, expect } from '@playwright/test'
import config from '../playwright.config'
test('should register, verify and login', async ({ page }) => {
  const email = 'farhang.darzi72@gmail.com'
  const password = 'Mntconix20$'
  const url = 'http://localhost:3000'
  await page.goto(url)
  await page.locator('.email').fill(email)
  await page.locator('.password').fill(password)
  await page.locator('.confirm-password').fill(password)
  // Click text=Sign up
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/verify?email=farhang.darzi11%40gmail.com' }*/),
    page.locator('button.register').click(),
  ])
  // Click text=Verify Account
  await Promise.all([page.waitForNavigation(), page.locator('.verify').click()])
  await page.locator('.email').fill(email)
  await page.locator('.password').fill(password)
  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/me' }*/),
    page.locator('.login').click(),
  ])

  await expect(page.locator('#greeting')).toContainText(email + ' ')
})
