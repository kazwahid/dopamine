import { test, expect } from '@playwright/test';

test('primary flow is completable in fullscreen showcase reel', async ({ page }) => {
  await page.goto('/');

  // 1. Check brand heading
  await expect(page.getByRole('heading', { name: /dopamine/i }).first()).toBeVisible();

  // 2. Transition into the reels
  await page.getByRole('button', { name: /dive into reels/i }).click();

  // 3. Navigate with keyboard through sequences to finale
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');

  // 4. Check finale
  await expect(page.getByRole('heading', { name: /dopaminnnne/i })).toBeVisible({ timeout: 6000 });
});
