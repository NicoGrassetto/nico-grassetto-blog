import { test, expect } from '@playwright/test';

const article = '/blog/service-to-service-calls-with-grpc/';
const selectedPanel = (workspace) => workspace.getByRole('tabpanel');

test.beforeEach(async ({ page }) => {
  await page.goto(article);
  await expect(page.locator('#shop-files-code')).toHaveAttribute('data-enhanced', 'true');
});

test('switches files and languages independently while retaining the logical file', async ({ page }) => {
  const workspace = page.locator('#shop-files-code');
  await workspace.getByRole('tab', { name: 'cmd/inventory/main.go', exact: true }).click();
  await workspace.getByRole('button', { name: 'Python', exact: true }).click();
  await expect(workspace.getByRole('tab', { name: 'inventory.py', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(selectedPanel(workspace)).toContainText('grpc.ssl_server_credentials');
  await workspace.getByRole('tab', { name: 'order.py', exact: true }).click();
  await workspace.getByRole('button', { name: 'Java', exact: true }).click();
  await expect(workspace.getByRole('tab', { name: 'src/main/java/OrderClient.java', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(selectedPanel(workspace)).toContainText('public class OrderClient');
  await expect(selectedPanel(workspace)).toHaveCount(1);
  await expect(page.locator('#hello-code')).toHaveAttribute('data-code-language', 'go');
  await expect(page.locator('#hello-code [data-code-languages] button')).toHaveCount(3);
});

test('every file in every workspace copies only its selected language', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const workspaces = page.locator('[data-code-workspace]');
  await expect(workspaces).toHaveCount(8);
  for (const workspace of await workspaces.all()) {
    for (const language of await workspace.locator('[data-code-languages] button').all()) {
      await language.click();
      const tabs = workspace.getByRole('tab');
      expect(await tabs.count()).toBeGreaterThan(0);
      for (const tab of await tabs.all()) {
        await tab.click();
        const panel = selectedPanel(workspace);
        await expect(panel).toHaveCount(1);
        await expect(panel).toHaveAttribute('aria-labelledby', await tab.getAttribute('id'));
        const blocks = await panel.locator('pre > code:visible').allTextContents();
        expect(blocks.length).toBeGreaterThan(0);
        await workspace.locator('[data-code-copy]').click();
        await expect(workspace.locator('[data-code-copy]')).toHaveText('Copied');
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(blocks.join('\n\n'));
      }
    }
  }
});

test('copies exactly the active file and resets feedback after switching', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const workspace = page.locator('#user-files-code');
  await workspace.getByRole('button', { name: 'Python', exact: true }).click();
  await workspace.getByRole('tab', { name: 'server.py', exact: true }).click();
  const server = await selectedPanel(workspace).locator('pre > code:visible').textContent();
  await workspace.getByRole('button', { name: 'Copy server.py', exact: true }).click();
  await expect(workspace.locator('[data-code-copy]')).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(server);
  await workspace.getByRole('tab', { name: 'client.py', exact: true }).click();
  await expect(workspace.locator('[data-code-copy]')).toHaveText('Copy');
  const client = await selectedPanel(workspace).locator('pre > code:visible').textContent();
  await workspace.getByRole('button', { name: 'Copy client.py', exact: true }).click();
  await expect(workspace.locator('[data-code-copy]')).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(client);
  expect(client).not.toBe(server);
  await workspace.getByRole('tab', { name: 'user.proto', exact: true }).click();
  const contract = await selectedPanel(workspace).locator('pre > code:visible').textContent();
  await workspace.getByRole('button', { name: 'Java', exact: true }).click();
  expect(await selectedPanel(workspace).locator('pre > code:visible').textContent()).toBe(contract);

  const snippet = page.locator('.code-snippet').first();
  const standalone = await snippet.locator('pre > code').textContent();
  await snippet.getByRole('button').click();
  await expect(snippet.getByRole('button')).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(standalone);
});

test('supports arrow, Home and End keyboard navigation between file tabs', async ({ page }) => {
  const workspace = page.locator('#shop-files-code');
  await workspace.getByRole('tab', { name: 'inventory.proto', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(workspace.getByRole('tab', { name: 'cmd/inventory/main.go', exact: true })).toBeFocused();
  await expect(workspace.getByRole('tab', { name: 'cmd/inventory/main.go', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(workspace.getByRole('tab', { name: 'cmd/order/main.go', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(workspace.getByRole('tab', { name: 'inventory.proto', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(workspace.getByRole('tab', { name: 'cmd/order/main.go', exact: true })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(workspace.getByRole('tab', { name: 'inventory.proto', exact: true })).toBeFocused();
  await expect(workspace.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
  await page.keyboard.press('Tab');
  await expect(selectedPanel(workspace)).toBeFocused();
});

test('does not expose Java build files in other languages', async ({ page }) => {
  const workspace = page.locator('#shop-run-code');
  await workspace.getByRole('button', { name: 'Java', exact: true }).click();
  await workspace.getByRole('tab', { name: 'build.gradle', exact: true }).click();
  await expect(selectedPanel(workspace)).toContainText("id 'com.google.protobuf'");
  await workspace.getByRole('button', { name: 'Go', exact: true }).click();
  await expect(workspace.getByRole('tab', { name: 'build.gradle', exact: true })).toHaveCount(0);
  await expect(workspace.getByRole('tab', { name: 'Start Inventory', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(selectedPanel(workspace)).toContainText('go run ./cmd/inventory');
});

test('reports clipboard failures instead of claiming success', async ({ page }) => {
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new DOMException('Clipboard access denied', 'NotAllowedError');
    };
  });
  const workspace = page.locator('#shop-files-code');
  await workspace.getByRole('button', { name: 'Copy inventory.proto', exact: true }).click();
  await expect(workspace.locator('[data-code-copy]')).toHaveText('Copy failed');
  await expect(workspace.getByRole('status')).toBeVisible();
  await expect(workspace.getByRole('status')).toHaveText('Copy failed. Select the code and copy it manually.');
  await expect(workspace.locator('[data-code-copy]')).toBeEnabled();
});

test('keeps every language and file readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}${article}`);
  const workspace = page.locator('#shop-files-code');
  await expect(workspace.locator('[data-code-toolbar]')).toBeHidden();
  await expect(workspace.locator('[data-code-tabs]')).toBeHidden();
  await expect(workspace.locator('#shop-inventory-go pre')).toBeVisible();
  await expect(workspace.locator('#shop-inventory-python pre')).toBeVisible();
  await expect(workspace.locator('#shop-order-node pre')).toBeVisible();
  await expect(workspace.locator('#shop-order-java pre')).toBeVisible();
  await context.close();
});

test('fits mobile and desktop screens in both themes', async ({ page }) => {
  for (const theme of ['dark', 'light']) {
    await page.evaluate((theme) => document.documentElement.setAttribute('data-theme', theme), theme);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const workspace = page.locator('#shop-files-code');
      const layout = await workspace.evaluate((element) => {
        const pre = element.querySelector('[data-code-file]:not([hidden]) pre');
        const bounds = element.getBoundingClientRect();
        return {
          left: bounds.left,
          right: bounds.right,
          preWidth: pre.getBoundingClientRect().width,
          panelWidth: bounds.width,
          background: getComputedStyle(pre).backgroundColor,
        };
      });
      expect(layout.left).toBeGreaterThanOrEqual(0);
      expect(layout.right).toBeLessThanOrEqual(width);
      expect(layout.preWidth).toBeLessThanOrEqual(layout.panelWidth);
      expect(layout.background).toBe(theme === 'dark' ? 'rgb(36, 41, 46)' : 'rgb(255, 255, 255)');
      await expect(workspace.getByRole('button', { name: 'Copy inventory.proto', exact: true })).toBeVisible();
    }
  }
});
