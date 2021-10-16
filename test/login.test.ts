import { test, Page } from "@playwright/test";
import LoginPage from "../pages/Login.page";

test.describe("Login", () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    await page.goto("/");
  });

  test("Should login success", async () => {
    await Promise.all([
      page.waitForNavigation(),
      loginPage.login("Administrator", "Network@123"),
    ]);
    const ctxt = await page.context();
    await ctxt.storageState({ path: "auth.json" });
  });
});
