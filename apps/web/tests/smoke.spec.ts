import { test, expect } from '@playwright/test';

test('homepage redirects to insights', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Insights' })).toBeVisible();
});
