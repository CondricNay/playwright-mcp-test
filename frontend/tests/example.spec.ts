import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:5000'); // your frontend URL
  await expect(page.locator('h1')).toHaveText('Vue + FastAPI App');
});
