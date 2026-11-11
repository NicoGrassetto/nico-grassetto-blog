import { test, expect } from '@playwright/test';

const article = '/blog/understanding-parsing-and-serialisation/';

test('all parsing examples support four languages and copy only the active file', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(article, { waitUntil: 'domcontentloaded' });
  const workspaces = page.locator('[data-code-workspace]');
  await expect(workspaces).toHaveCount(4);
  for (const workspace of await workspaces.all()) {
    await expect(workspace).toHaveAttribute('data-enhanced', 'true');
    await expect(workspace.locator('[data-code-languages] button')).toHaveText(['Go', 'Java', 'JavaScript', 'Python']);
    for (const language of await workspace.locator('[data-code-languages] button').all()) {
      await language.click();
      for (const tab of await workspace.getByRole('tab').all()) {
        await tab.click();
        const panel = workspace.getByRole('tabpanel');
        await expect(panel).toHaveCount(1);
        const source = await panel.locator('pre > code:visible').textContent();
        expect(source.trim()).not.toBe('');
        await workspace.locator('[data-code-copy]').click();
        await expect(workspace.locator('[data-code-copy]')).toHaveText('Copied');
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
      }
    }
  }
});

test('Java setup is language-specific and the sample JSON is shared across languages', async ({ page }) => {
  await page.goto(article, { waitUntil: 'domcontentloaded' });
  const parsing = page.locator('#json-parse-code');
  await parsing.getByRole('button', { name: 'Java', exact: true }).click();
  await parsing.getByRole('tab', { name: 'build.gradle', exact: true }).click();
  await expect(parsing.getByRole('tabpanel')).toContainText('jackson-databind');
  await parsing.getByRole('button', { name: 'Python', exact: true }).click();
  await expect(parsing.getByRole('tab', { name: 'build.gradle', exact: true })).toHaveCount(0);
  await expect(parsing.getByRole('tab', { name: 'parse.py', exact: true })).toHaveAttribute('aria-selected', 'true');

  const files = page.locator('#json-files-code');
  await files.getByRole('tab', { name: 'order.json', exact: true }).click();
  const input = await files.getByRole('tabpanel').locator('pre > code').textContent();
  expect(JSON.parse(input)).toEqual({ id: 42, item: 'book', quantity: 2 });
  for (const language of await files.locator('[data-code-languages] button').all()) {
    await language.click();
    await expect(files.getByRole('tab', { name: 'order.json', exact: true })).toHaveAttribute('aria-selected', 'true');
    await expect(files.getByRole('tabpanel').locator('pre > code')).toHaveText(input);
  }

  const protobuf = page.locator('#protobuf-code');
  await protobuf.getByRole('tab', { name: 'order.proto', exact: true }).click();
  for (const language of await protobuf.locator('[data-code-languages] button').all()) {
    await language.click();
    await expect(protobuf.getByRole('tab', { name: 'order.proto', exact: true })).toHaveAttribute('aria-selected', 'true');
    await expect(protobuf.getByRole('tabpanel')).toContainText('int32 quantity = 3;');
  }
});

test('the article, code panels and diagram fit mobile and desktop in both themes', async ({ page }) => {
  await page.goto(article, { waitUntil: 'domcontentloaded' });
  for (const workspace of await page.locator('[data-code-workspace]').all()) {
    await workspace.getByRole('button', { name: 'Java', exact: true }).click();
  }
  for (const theme of ['dark', 'light']) {
    await page.evaluate((theme) => document.documentElement.setAttribute('data-theme', theme), theme);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const layout = await page.evaluate(() => ({
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        panels: [...document.querySelectorAll('[data-code-workspace], .serialisation-diagram, .serialisation-diagram .value-card')].map((panel) => panel.getBoundingClientRect().toJSON()),
        cards: [...document.querySelectorAll('.serialisation-diagram .value-card')].map((card) => ({
          scrollWidth: card.scrollWidth,
          clientWidth: card.clientWidth,
        })),
      }));
      expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
      for (const panel of layout.panels) {
        expect(panel.left).toBeGreaterThanOrEqual(0);
        expect(panel.right).toBeLessThanOrEqual(width);
      }
      for (const card of layout.cards) {
        expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth);
      }
    }
  }
});

test('the static diagram shows equivalent values before and after the JSON round trip without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}${article}`, { waitUntil: 'domcontentloaded' });
  const diagram = page.getByRole('figure', { name: 'An order sent from a client to a server', exact: true });
  await expect(diagram).toBeVisible();
  await expect(diagram.locator('.card-title')).toHaveText(['Client', 'JSON text', 'Server']);
  await expect(diagram.locator('.conversion')).toHaveText(['Serialise', 'Deserialise']);
  const values = await diagram.locator('.order-fields').evaluateAll(lists => lists.map(list =>
    Object.fromEntries([...list.children].map(field => [
      field.querySelector('dt').textContent,
      JSON.parse(field.querySelector('dd').firstChild.textContent),
    ])),
  ));
  const wireValue = JSON.parse(await diagram.locator('pre > code').textContent());
  expect(values).toEqual([wireValue, wireValue]);
  await expect(diagram).toContainText("not the client's original object");
  await context.close();
});
