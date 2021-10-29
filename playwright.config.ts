import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  retries: 0,
  use: {
    headless: false,
    baseURL: "http://localhost:8000",
    // channel: "chrome",
    browserName: "chromium",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: {
      slowMo: 200,
    },
    storageState: "auth.json",
  },
  // globalSetup: require.resolve("./global-setup"),
  // grep: [new RegExp("@validation")],
  testMatch: ["login.test.ts"],
  // testMatch: ["validate_form_district.ts"],
  reporter: [["dot"], ["allure-playwright"]],
  // reporter: [["dot"]],
};

export default config;
