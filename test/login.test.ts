import { Page } from "playwright";
import Environment from "../env/Environments";
import LoginPage from "../pages/Login.page";
declare const page: Page;

describe("Login", () => {
  let loginBtn: any;
  let errorDiv: any;
  let loginPage: LoginPage;

  beforeAll(async () => {
    await page.goto(Environment.baseURL);
    loginPage = new LoginPage(page);
  });

  beforeEach(async () => {
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
    await page.waitForLoadState("domcontentloaded");
    const errorTxt = await errorDiv?.innerText();
    expect(errorTxt).toBe("Admin123 is not registered");
  });

  test("Login Success", async () => {
    await Promise.all([
      page.waitForNavigation(),
      loginPage.login("Administrator", "Network@123"),
    ]);
  });
});
