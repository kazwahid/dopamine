import { test, expect } from '@playwright/test';

test('primary user navigation flow across landing page and footer', async ({ page }) => {
  await page.goto('/');

  // 1. Verify brand heading and navigation landmark
  await expect(page.getByRole('heading', { name: /dopamine/i }).first()).toBeVisible();

  // 2. Verify showcase and main section landmarks exist
  await expect(page.getByLabel('Hero Section')).toBeVisible();
  await expect(page.getByLabel('Contact Section')).toBeVisible();
  await expect(page.getByLabel('Studio Footer')).toBeVisible();

  // 3. Verify footer impact statement and newsletter input
  await expect(page.getByRole('heading', { name: /let's make an impact together/i })).toBeVisible();
  const emailInput = page.getByPlaceholder('enter your email');
  await expect(emailInput).toBeVisible();
});
