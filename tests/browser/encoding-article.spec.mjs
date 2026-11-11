import { test, expect } from '@playwright/test';

const article = '/blog/understanding-encoding/';

test('the encoding article has three multilingual workspaces with working file tabs and copy controls', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(article, { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Understanding encoding');
  await expect(page.getByRole('list', { name: 'Tags' })).toHaveText('Engineering');
  const workspaces = page.locator('[data-code-workspace]');
  await expect(workspaces).toHaveCount(3);
  for (const workspace of await workspaces.all()) {
    await expect(workspace).toHaveAttribute('data-enhanced', 'true');
    await expect(workspace.locator('[data-code-languages] button')).toHaveText(['Go', 'Java', 'JavaScript', 'Python']);
    for (const language of await workspace.locator('[data-code-languages] button').all()) {
      await language.click();
      for (const tab of await workspace.getByRole('tab').all()) {
        await tab.click();
        const source = await workspace.getByRole('tabpanel').locator('pre > code:visible').textContent();
        expect(source.trim()).not.toBe('');
        await workspace.locator('[data-code-copy]').click();
        await expect(workspace.locator('[data-code-copy]')).toHaveText('Copied');
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
      }
    }
  }
});

test('encoding examples and the character-encoding table fit both themes on mobile and desktop', async ({ page }) => {
  await page.goto(article, { waitUntil: 'domcontentloaded' });
  for (const workspace of await page.locator('[data-code-workspace]').all()) {
    await workspace.getByRole('button', { name: 'Java', exact: true }).click();
  }
  for (const theme of ['dark', 'light']) {
    await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), theme);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const layout = await page.evaluate(() => ({
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        panels: [...document.querySelectorAll('[data-code-workspace], .table-scroll')].map(panel => panel.getBoundingClientRect().toJSON()),
      }));
      expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
      for (const panel of layout.panels) {
        expect(panel.left).toBeGreaterThanOrEqual(0);
        expect(panel.right).toBeLessThanOrEqual(width);
      }
    }
  }
});
