import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // retries: 0,
  use: {
    headless: false,
    baseURL: "http://localhost:8000/api",
    // channel: "chrome",
    browserName: "chromium",
    screenshot: "only-on-failure",
    // trace: "retain-on-failure",
  },
  // globalSetup: require.resolve("./global-setup"),
  // grep: [new RegExp("@validation")],
  testMatch: ["login.api.test.ts"],
  // reporter: [["dot"], ["allure-playwright"]],
  reporter: [["dot"]],
};

export default config;
