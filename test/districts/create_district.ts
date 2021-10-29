import { expect, test, Page } from "@playwright/test";
import District from "../../pages/districts/District.page";

test.describe("Create new district", () => {
  let page: Page;
  let districtPage: District;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    districtPage = new District(page);
  });

  test("Goto divisions -> district", async () => {
    await page.goto(`/administration/divisions/district`);
    await page.waitForLoadState("networkidle");

    expect(await page.title()).toBe("AP SDWAN Portal - District Management");
  });

  test("Create district modal", async () => {
    await page.click('span:text("Create")');
    await page.waitForSelector("button[type=submit] span:text('OK')");
  });

  test("Add new district", async () => {
    const district_input = await page.$('input[name="district_name"]');
    const dName = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    await district_input?.type(dName);
    await page.click("button[type=submit] span:text('OK')");

    expect(await districtPage.getToastMessage()).toBe(
      `${dName} district created successfully.`
    );

    await page.waitForTimeout(3000);
  });
});
