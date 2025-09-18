import { test, expect } from '@playwright/test';

test('SMEBank SSO login and search SSO group', async ({ page }) => {
  // Go to login page
  await page.goto('https://dsso-sit.smebank.local/login');

  // Fill username and password
  await page.getByRole('textbox', { name: 'Login (Outlook)' }).fill('pa67132');
  await page.getByRole('textbox', { name: 'Password' }).fill('P@ssw88rd');

  // Click login
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Wait for dashboard
  await expect(page.getByRole('heading', { name: 'D-SSO' })).toBeVisible();

  // Click จัดการสิทธิ์
  await page.getByText('จัดการสิทธิ์', { exact: true }).click();

  // Click กลุ่มผู้ใช้งาน
  await page.getByText('กลุ่มผู้ใช้งาน', { exact: true }).click();

  // Search for SSO
  await page.getByRole('textbox', { name: 'ค้นหาข้อมูล' }).fill('SSO');

  // Assert SSO Admin group is visible
  await expect(page.getByText('SSO Admin')).toBeVisible();

  // Pause for manual inspection
  await page.pause();
});
