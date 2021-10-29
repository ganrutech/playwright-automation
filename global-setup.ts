// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);

  await page.fill('input[name="username"]', "Administrator");
  await page.fill('input[name="password"]', "Network@123");
  await page.click('input[name="robot"]');
  await page.click("button:text('Login')");

  await page.waitForNavigation();

  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
