import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // retries: 0,
  use: {
    headless: false,
    baseURL: "http://localhost:8000/api",
    browserName: "chromium",
    screenshot: "only-on-failure",
  },
  // grep: [new RegExp("@validation")],
  testMatch: ["login.api.test.ts"],
  // reporter: [["dot"], ["allure-playwright"]],
  reporter: [["dot"]],
};

export default config;
