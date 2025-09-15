import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:5000'); // your frontend URL
  await expect(page.locator('h1')).toHaveText('Vue + FastAPI App');
});

test('fetch message button works', async ({ page }) => {
  await page.goto('http://localhost:5000');
  await page.click('text=Get Message from FastAPI');
  await expect(page.locator('p')).toContainText('Hello from FastAPI');
});
