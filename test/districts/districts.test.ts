import { Page } from "playwright";
import Environment from "../../env/Environments";
import District from "../../pages/districts/District.page";
import LoginPage from "../../pages/Login.page";

declare const page: Page;

describe("Districts", () => {
  let loginPage: LoginPage;
  let districtPage: District;

  beforeAll(async () => {
    await page.goto(Environment.baseURL);
    loginPage = new LoginPage(page);
    districtPage = new District(page);
  });

  test("Login Success", async () => {
    await Promise.all([
      page.waitForNavigation(),
      loginPage.login("Administrator", "Network@123"),
    ]);
  });

  test("Goto District", async () => {
    await page.goto(`${Environment.baseURL}/administration/divisions/district`);
    expect(await page.title()).toBe(
      "Orchestration Portal - District Management"
    );
  });

  test("Open Modal", async () => {
    await page.waitForLoadState();
    await page.click('"Create"');
    await page.waitForSelector("button[type=submit] span:text('OK')");
    await page.click("button[type=submit] span:text('OK')");
  });

  xtest("Check is Empty", async () => {
    expect(await districtPage.checkErroMessage()).toEqual([
      '"District Name" is a required field',
    ]);
  });

  test("Minimum 3 characters required", async () => {
    const district_input = await page.$('input[name="district_name"]');
    await district_input?.fill("ab");

    expect(await districtPage.checkErroMessage()).toEqual([
      "Minimum 3 characters required",
    ]);
  });

  test('"District Name" cannot contain special characters', async () => {
    const district_input = await page.$('input[name="district_name"]');
    await district_input?.fill("ab#4$");

    expect(await districtPage.checkErroMessage()).toEqual([
      '"District Name" cannot contain special characters',
    ]);
  });
});
