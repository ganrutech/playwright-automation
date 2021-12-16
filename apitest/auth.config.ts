import { PlaywrightTestConfig } from "@playwright/test";
const tokenData = require("../apiToken.json");

const config: PlaywrightTestConfig = {
  retries: 1,
  use: {
    headless: false,
    baseURL: "http://localhost:8000/api",
    extraHTTPHeaders: {
      Authorization: `Bearer ${tokenData.accessToken}`,
    },
    browserName: "chromium",
    screenshot: "only-on-failure",
    // channel: "chrome",
    trace: "retain-on-failure",
  },
  // globalSetup: require.resolve("./global-setup"),
  // grep: [new RegExp("@district")],
  testMatch: ["get_district.api.test.ts"],
  // testMatch: ["login.api.test.ts"],
  // reporter: [["list"], ["allure-playwright"]],
  // reporter: [["list"], ["html"]],
  reporter: [["dot"], ["json", { outputFile: "reports.json" }]],
};

export default config;
