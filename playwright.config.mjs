import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4337';

export default defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4337',
    url: `${baseURL}/blog/service-to-service-calls-with-grpc/`,
    timeout: 60_000,
  },
});
