import { test, expect } from '@playwright/test';

test.describe('Practice Test Automation - Positive Login', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    // Open login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Fill in username and password
    await page.getByRole('textbox', { name: 'Username' }).fill('student');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

    // Submit the form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify new page URL
    await expect(page).toHaveURL(/.*practicetestautomation\.com\/logged-in-successfully\//);

    // Verify expected text is present
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
    await expect(page.getByText(/Congratulations.*successfully logged in/i)).toBeVisible();

    // Verify Log out button is displayed
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });
});
