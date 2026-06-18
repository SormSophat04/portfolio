import { test, expect } from '@playwright/test'

test.describe('Smoke tests', () => {
  test('home page renders all portfolio sections', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    await expect(page.locator('#home')).toBeAttached({ timeout: 15000 })
    await expect(page.locator('#about')).toBeAttached()
    await expect(page.locator('#skills')).toBeAttached()
    await expect(page.locator('#projects')).toBeAttached()
    await expect(page.locator('#timeline')).toBeAttached()
    await expect(page.locator('#services')).toBeAttached()
    await expect(page.locator('#testimonials')).toBeAttached()
  })

  test('login page renders the form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[type="email"]')).toBeAttached()
    await expect(page.locator('input[type="password"]')).toBeAttached()
    await expect(page.locator('button[type="submit"]')).toBeAttached()
  })

  test('login form submits without crashing', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'test123')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)
    const emailField = page.locator('input[type="email"]')
    await expect(emailField).toBeAttached({ timeout: 3000 })
  })

  test('unknown route redirects to home page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist', { waitUntil: 'load' })
    await expect(page.locator('#home')).toBeAttached({ timeout: 10000 })
  })
})
