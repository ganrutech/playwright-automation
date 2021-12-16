import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // retries: 0,
  use: {
    headless: false,
    baseURL: "http://localhost:8000",
    browserName: "chromium",
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 200,
    },
  },
  testMatch: ["login.test.ts"],
  // reporter: [["dot"], ["allure-playwright"]],
  reporter: [["dot"]],
};

export default config;
