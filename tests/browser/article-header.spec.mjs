import { test, expect } from '@playwright/test';

const article = '/blog/service-to-service-calls-with-grpc/';
const publicURL = 'https://www.nicograssetto.com/blog/service-to-service-calls-with-grpc';

test('shows Engineering and the date above the title, then a divider and Share', async ({ page }) => {
  await page.goto(article);
  const header = page.locator('.paper-header');
  await expect(header.getByRole('list', { name: 'Tags' })).toHaveText('Engineering');
  await expect(header.locator('time')).toHaveAttribute('datetime', '2026-11-10');
  await expect(header).not.toContainText('Nico Grassetto');
  const positions = await header.evaluate((element) => {
    const meta = element.querySelector('.post-meta').getBoundingClientRect();
    const title = element.querySelector('h1').getBoundingClientRect();
    const actions = element.querySelector('.post-actions');
    return {
      metaBottom: meta.bottom,
      titleTop: title.top,
      titleBottom: title.bottom,
      dividerTop: actions.getBoundingClientRect().top,
      border: getComputedStyle(actions).borderTopWidth,
    };
  });
  expect(positions.metaBottom).toBeLessThan(positions.titleTop);
  expect(positions.titleBottom).toBeLessThan(positions.dividerTop);
  expect(positions.border).toBe('1px');
  await expect(header.getByRole('button', { name: 'Share', exact: true })).toBeVisible();
});

test('uses the native share sheet with the public URL and article title', async ({ page }) => {
  await page.addInitScript(() => {
    navigator.share = async (data) => { window.sharedPost = data; };
  });
  await page.goto(`${article}?preview=true`);
  await page.getByRole('button', { name: 'Share', exact: true }).click();
  expect(await page.evaluate(() => window.sharedPost)).toEqual({
    title: await page.locator('.paper-title').textContent(),
    url: publicURL,
  });
  await expect(page.locator('[data-share-status]')).toHaveText('Post shared.');
  await expect(page.getByRole('button', { name: 'Share', exact: true })).toBeEnabled();
});

test('copies the public link when native sharing is unavailable', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { value: undefined });
  });
  await page.goto(article);
  await page.getByRole('button', { name: 'Share', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Link copied', exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(publicURL);
  await expect(page.locator('[data-share-status]')).toHaveText('Post link copied to clipboard.');
});

test('cancelling native sharing is not reported as an error', async ({ page }) => {
  await page.addInitScript(() => {
    navigator.share = async () => { throw new DOMException('Cancelled', 'AbortError'); };
  });
  await page.goto(article);
  await page.getByRole('button', { name: 'Share', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Share', exact: true })).toBeEnabled();
  await expect(page.locator('[data-share-status]')).toBeEmpty();
  await expect(page.locator('[data-share-status]')).not.toHaveAttribute('data-error');
});

test('shows actionable feedback when sharing fails', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { value: undefined });
    navigator.clipboard.writeText = async () => {
      throw new DOMException('Permission denied', 'NotAllowedError');
    };
  });
  await page.goto(article);
  await page.getByRole('button', { name: 'Share', exact: true }).click();
  await expect(page.locator('[data-share-status]')).toBeVisible();
  await expect(page.locator('[data-share-status]')).toHaveText('Unable to share this post. Copy the link from your browser address bar.');
  await expect(page.getByRole('button', { name: 'Share', exact: true })).toBeEnabled();
});

test('existing posts without tags retain their date, title and share action', async ({ page }) => {
  await page.goto('/blog/agi-as-a-multi-dimensional-spectrum/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('.paper-header');
  await expect(header.getByRole('list', { name: 'Tags' })).toHaveCount(0);
  await expect(header.locator('time')).toBeVisible();
  await expect(header.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(header.getByRole('button', { name: 'Share', exact: true })).toBeVisible();
});

test('the header remains centered and fits both themes on mobile and desktop', async ({ page }) => {
  await page.goto(article);
  for (const theme of ['dark', 'light']) {
    await page.evaluate((theme) => document.documentElement.setAttribute('data-theme', theme), theme);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const layout = await page.locator('.paper-header').evaluate((header) => {
        const title = header.querySelector('h1');
        const button = header.querySelector('[data-share]');
        const actions = header.querySelector('.post-actions');
        return {
          left: header.getBoundingClientRect().left,
          right: header.getBoundingClientRect().right,
          titleOverflow: title.scrollWidth > title.clientWidth,
          titleAlign: getComputedStyle(title).textAlign,
          titleFont: getComputedStyle(title).fontFamily,
          titleSize: parseFloat(getComputedStyle(title).fontSize),
          actionsLeft: actions.getBoundingClientRect().left,
          actionsRight: actions.getBoundingClientRect().right,
          shareLeft: button.getBoundingClientRect().left,
        };
      });
      expect(layout.left).toBeGreaterThanOrEqual(0);
      expect(layout.right).toBeLessThanOrEqual(width);
      expect(layout.titleOverflow).toBe(false);
      expect(layout.titleAlign).toBe('center');
      expect(layout.titleFont).not.toContain('JetBrains Mono');
      expect(layout.actionsLeft).toBeGreaterThanOrEqual(layout.left);
      expect(layout.actionsRight).toBeLessThanOrEqual(layout.right);
      expect(layout.shareLeft).toBe(layout.actionsLeft);
      if (width >= 768) {
        expect(layout.titleSize).toBeGreaterThan(48);
        expect(layout.actionsRight - layout.actionsLeft).toBeLessThan(layout.right - layout.left);
      }
    }
  }
});
