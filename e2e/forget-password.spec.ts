import { test, expect } from '@playwright/test'
import config from '../playwright.config'
test('should change the password and login', async ({ page }) => {
  const email = 'farhang.darzi50@gmail.com'
  const newPassword = 'Mntconix20$$'
  const url = 'http://localhost:3000'

  // Go to http://localhost:3000/
  await page.goto(url)
  // Click text=Login to your account
  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Login to your account').click(),
  ])
  // Click text=Forget Your password
  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Forget Your password').click(),
  ])
  await page.locator('.email').fill(email)
  await page.locator('.newPassword').fill(newPassword)
  await page.locator('.confirmNewPassword').fill(newPassword)
  // Click text=Sign in

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
    await page.locator('button.reset-password').click(),
  ])

  await page.locator('.email').fill(email)
  await page.locator('.password').fill(newPassword)

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/me' }*/),
    page.locator('.login').click(),
  ])

  await expect(page.locator('#greeting')).toContainText(email + ' ')
})
