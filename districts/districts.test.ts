import { chromium, Browser, BrowserContext, Page } from "playwright";
import baseURL, { launchConfig } from "../shared/utilites";

describe("Districts", () => {
  let browser: Browser;
  let page: Page;
  let context: BrowserContext;
  let loginBtn: any;

  beforeAll(async () => {
    browser = await chromium.launch(launchConfig);
    context = await browser.newContext();
    page = await browser.newPage();

    await page.goto(baseURL);
  });

  beforeEach(async () => {
    loginBtn = await page.$("button:text('Login')");
  });

  test("Login Success", async () => {
    await page.type('input[name="username"]', "Administrator");
    await page.type('input[name="password"]', "Network@123");
    await page.click('input[name="robot"]');

    await Promise.all([page.waitForNavigation(), loginBtn?.click()]);
  });

  test("Goto District", async () => {
    await page.goto(`${baseURL}/administration/divisions/district`);
  });

  test("Create new district", async () => {
    await page.waitForLoadState("domcontentloaded");
    await page.click(
      '//*[@id="__next"]/div/div[2]/div[2]/div[2]/div[1]/div[1]/button[1]'
    );
    await page.waitForSelector("button[type=submit] span:text('OK')");
    await page.click("button[type=submit] span:text('OK')");

    await page.waitForSelector("[data-validation]");

    const isError = await page.$("label[for='District Name']");

    console.log(isError);
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
