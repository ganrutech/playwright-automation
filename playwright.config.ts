import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // retries: 0,
  use: {
    headless: false,
    launchOptions: {
      slowMo: 200,
    },
    baseURL: "http://localhost:8000",
    // channel: "chrome",
    browserName: "chromium",
    screenshot: "only-on-failure",
    // trace: "retain-on-failure",
    storageState: "auth.json",
  },
  // globalSetup: require.resolve("./global-setup"),
  // grep: [new RegExp("@validation")],
  testMatch: ["validate_form_district.ts"],
  // reporter: [["dot"], ["allure-playwright"]],
  reporter: [["list"]],
};

export default config;
