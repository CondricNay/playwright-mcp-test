import { test, expect } from '@playwright/test';

test('should add a todo called TEST%55', async ({ page }) => {
  await page.goto('http://localhost:5000');
  await page.getByRole('textbox', { name: 'Add a new task...' }).fill('TEST%55');
  await page.getByRole('button', { name: 'Add' }).click();
  // Assert the new todo appears in the list
  await expect(page.getByRole('listitem').filter({ hasText: 'TEST%55' })).toBeVisible();
  });
