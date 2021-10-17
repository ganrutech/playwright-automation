import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    baseURL: "http://localhost:8000",
    // channel: "chrome",
    browserName: "chromium",
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 200,
    },
    storageState: "auth.json",
  },
  // grep: [new RegExp("@validation")],
  // testMatch: ["login.test.ts"],
  testMatch: ["validate_form_district.ts"],
  reporter: [["dot"], ["allure-playwright"]],
};

export default config;
