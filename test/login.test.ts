import { chromium, Browser, BrowserContext, Page } from "playwright";
import { launchConfig } from "../shared/utilites";

describe("Login", () => {
  let browser: Browser;
  let page: Page;
  let context: BrowserContext;
  let loginBtn: any;
  let errorDiv: any;

  beforeAll(async () => {
    browser = await chromium.launch(launchConfig);
    context = await browser.newContext();
    page = await browser.newPage();
    await page.goto("http://192.168.5.59:8000");

    loginBtn = await page.$("button:text('Login')");
    errorDiv = await page.$(".field-error.font-semibold");
  });

  test("Validate Username", async () => {
    await loginBtn?.click();
    const errorTxt = await errorDiv?.innerText();
    await page.type('input[name="username"]', "Administrator");

    expect(errorTxt).toBe("Username is required");
  });

  test("Validate Password", async () => {
    await loginBtn?.click();
    const errorTxt = await errorDiv?.innerText();
    await page.type('input[name="password"]', "Network@123");

    expect(errorTxt).toBe("Password is required");
  });

  test("I'm not robot", async () => {
    await loginBtn?.click();
    const isRobot = await page.$('input[name="robot"]');
    const expectValue = await isRobot?.isChecked();

    expect(expectValue).toBe(false);

    const errorTxt = await errorDiv?.innerText();
    expect(errorTxt).toBe("Verify that you are not a robot");

    await isRobot?.click();
  });

  test("Invalid Credential", async () => {
    await page.fill('input[name="username"]', "Admin123");
    await Promise.all([page.waitForNavigation(), loginBtn?.click()]);
  });

  test("Username is not registered", async () => {
    await page.waitForSelector(".field-error.font-semibold");
    const eDiv = await page.$(".field-error.font-semibold");
    const errorTxt = await eDiv?.innerText();
    expect(errorTxt).toBe("Admin123 is not registered");
  });

  test("Login Success", async () => {
    await page.type('input[name="username"]', "Administrator");
    await page.type('input[name="password"]', "Network@123");
    await page.click('input[name="robot"]');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button:text("Login")'),
    ]);
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
