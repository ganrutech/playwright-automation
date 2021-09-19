import { test, expect, Page } from "@playwright/test";
import LoginPage from "../../pages/Login.page";

test.describe("Create new district", () => {
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
  });

  test("Goto District", async () => {
    await page.goto(`/administration/divisions/district`);
    await page.waitForLoadState("networkidle");

    expect(await page.title()).toBe("AP SDWAN Portal - District Management");
  });
});
