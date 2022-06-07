import { test, expect } from '@playwright/test'
import config from '../playwright.config'
test('should register, verify and login', async ({ page }) => {
  const email = 'farhang.darzi16@gmail.com'

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/')
  // Click [placeholder="youremail\@provider\.com"]
  await page.locator('[placeholder="youremail\\@provider\\.com"]').click()
  // Fill [placeholder="youremail\@provider\.com"]
  await page.locator('[placeholder="youremail\\@provider\\.com"]').fill(email)
  // Press Tab
  await page.locator('[placeholder="youremail\\@provider\\.com"]').press('Tab')
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('Mntconix20$')
  // Press Tab
  await page.locator('[placeholder="Password"]').press('Tab')
  // Fill [placeholder="Confirm password"]
  await page.locator('[placeholder="Confirm password"]').fill('Mntconix20$')
  // Click text=Sign up
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/verify?email=farhang.darzi11%40gmail.com' }*/),
    page.locator('text=Sign up').click(),
  ])
  // Click text=Verify Account
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
    page.locator('text=Verify Account').click(),
  ])
  // Click [placeholder="youremail\@provider\.com"]
  await page.locator('[placeholder="youremail\\@provider\\.com"]').click()

  // Fill [placeholder="youremail\@provider\.com"]
  await page.locator('[placeholder="youremail\\@provider\\.com"]').fill(email)
  // Press Tab
  await page.locator('[placeholder="youremail\\@provider\\.com"]').press('Tab')
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('Mntconix20$')
  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/me' }*/),
    page.locator('[placeholder="Password"]').press('Enter'),
  ])

  await expect(page.locator('#greeting')).toContainText(email + ' ')
})
