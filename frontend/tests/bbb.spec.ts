import { test, expect } from '@playwright/test';

// Test for successful login to D-SSO system
test('D-SSO login should succeed and show dashboard', async ({ page }) => {
  await page.goto('https://dsso-sit.smebank.local/login');

  // Fill in login form
  await page.getByRole('textbox', { name: /login/i }).fill('pa67132');
  await page.getByRole('textbox', { name: /password/i }).fill('P@ssw88rd');
  await page.getByRole('button', { name: /login/i }).click();

  // Assert redirected to dashboard and dashboard info is visible
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Wellcome To D-SSO')).toBeVisible();
  await page.pause();
});