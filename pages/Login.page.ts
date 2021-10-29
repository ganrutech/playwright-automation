import { Page } from "@playwright/test";

export default class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async enterUsername(username: string) {
    const ele = await this.page.$('input[name="username"]');
    await ele?.fill(username);
  }

  public async enterPassword(password: string) {
    const ele = await this.page.$('input[name="password"]');
    await ele?.fill(password);
  }

  public async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.page.click('input[name="robot"]');
    await this.page.click("button:text('Login')");
  }
}
