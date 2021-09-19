import { test as baseTest } from "@playwright/test";

import LoginPage from "../pages/Login.page";

export const test = baseTest.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const expect = test.expect;
