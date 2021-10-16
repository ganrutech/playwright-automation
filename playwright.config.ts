import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    browserName: "chromium",
    baseURL: "http://localhost:8000",
    launchOptions: {
      slowMo: 500,
    },
  },
  // grep: [new RegExp("@smoke")],
  testMatch: ["create_district.ts"],
  reporter: [["dot"], ["allure-playwright"]],
};

export default config;
