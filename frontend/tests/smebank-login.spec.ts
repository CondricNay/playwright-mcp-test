import { test, expect } from '@playwright/test';

// Test for successful login to SME Bank admin portal
// Credentials: username pa67132, password P@ssw88rd

test('SMEBANK admin login should succeed and show profile', async ({ page }) => {
  await page.goto('https://devweb.smebank.co.th/eservices/admin.php');

  // Fill in login form
  await page.getByRole('textbox', { name: 'Login' }).fill('pa67132');
  await page.getByRole('textbox', { name: 'Password' }).fill('P@ssw88rd');
  await page.getByRole('button', { name: /login/i }).click();

  // Assert redirected to profile page and profile info is visible
  await expect(page).toHaveURL(/profile\.php/);
  await expect(page.getByText('ข้อมูลส่วนตัว')).toBeVisible();
  await expect(page.getByRole('textbox', { name: /ชื่อผู้ใช้/i })).toHaveValue(/PA67132/i);
});
