import { test, expect } from '@playwright/test';

test('Positive LogIn test: valid credentials log in successfully', async ({ page }) => {
  // Open login page
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  // Fill in username and password
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

  // Click submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // Assert URL contains /logged-in-successfully/
  await expect(page).toHaveURL(/.*\/logged-in-successfully\//);

  // Assert success message is visible
  await expect(
    page.getByRole('heading', { name: 'Logged In Successfully' })
  ).toBeVisible();
  await expect(
    page.getByText(/Congratulations|successfully logged in/i)
  ).toBeVisible();

  // Assert Log out button is visible
  await expect(
    page.getByRole('link', { name: 'Log out' })
  ).toBeVisible();
});
