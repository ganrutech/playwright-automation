import { test, expect, Page, BrowserContext } from "@playwright/test";
import District from "../../pages/districts/District.page";

// test.use({ storageState: "auth.json" });
test.describe("District form validation", () => {
  let context: BrowserContext;
  let page: Page;
  let districtPage: District;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();

    page = await context.newPage();
    districtPage = new District(page);
  });

  test("Goto divisions -> district @district-validate", async () => {
    await page.goto(`/administration/divisions/district`);
    await page.waitForLoadState("networkidle");

    expect(await page.title()).toBe("AP SDWAN Portal - District Management");

    await page.click('span:text("Create")');
    await page.waitForSelector("button[type=submit] span:text('OK')");
  });

  test("Create district modal @district-validate", async () => {
    await page.click("button[type=submit] span:text('OK')");
  });

  test("Should district name @district-validate", async () => {
    expect(await districtPage.checkErroMessage()).toEqual([
      '"District Name" is a required field',
    ]);
  });

  test("Should minimum 3 characters required @district-validate", async () => {
    const district_input = await page.$('input[name="district_name"]');
    await district_input?.type("ab");

    expect(await districtPage.checkErroMessage()).toEqual([
      "Minimum 3 characters required",
    ]);
  });

  test("Should district cannot contain special characters @district-validate", async () => {
    const district_input = await page.$('input[name="district_name"]');
    await district_input?.type("ab#4$");

    expect(await districtPage.checkErroMessage()).toEqual([
      '"District Name" cannot contain special characters',
    ]);
  });
});
