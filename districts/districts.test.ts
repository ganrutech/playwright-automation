import { chromium, Browser, BrowserContext, Page } from "playwright";
import { launchConfig } from "../shared/utilites";

describe("Districts", () => {
  let browser: Browser;
  let page: Page;
  let context: BrowserContext;
  let loginBtn: any;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await browser.newPage();
    await page.goto("http://192.168.5.59:8000");
    loginBtn = await page.$("button:text('Login')");
  });

  test("Login", async () => {
    // Form Fields
    await page.type('input[name="username"]', "Administrator");
    await page.type('input[name="password"]', "Network@123");
    await page.click('input[name="robot"]');

    // Login Button
    await loginBtn?.click();
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
