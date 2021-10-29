import { test, expect, Page } from "@playwright/test";
import LoginPage from "../pages/Login.page";

test.describe("Login", () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    await page.goto("/");
  });

  test("Login form validation", async () => {
    const username = page.locator('input[name="username"]');
    const password = page.locator('input[name="password"]');
    // const robot = page.locator('input[name="robot"]');
    const loginBtn = page.locator('button[type="submit"]:text("Login")');
    const errorMessage = page.locator("div.field-error");

    await test.step("Should username is required", async () => {
      await loginBtn?.click();
      expect(await errorMessage.textContent()).toBe("Username is required");
    });

    await test.step("Should password is required", async () => {
      await username?.fill("Administrator");
      await loginBtn?.click();
      expect(await errorMessage.textContent()).toBe("Password");
    });

    await test.step("Should Verify that you are not a robot", async () => {
      await password?.fill("Network@123");
      await loginBtn?.click();
      expect(await errorMessage.textContent()).toBe(
        "Verify that you are not a robot"
      );
    });

    await page.waitForTimeout(3000);
  });

  test("Should login success", async () => {
    await Promise.all([
      page.waitForNavigation(),
      loginPage.login("Administrator", "Network@123"),
    ]);
    // const ctxt = await page.context();
    // await ctxt.storageState({ path: "auth.json" });
  });
});
