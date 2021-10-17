import { Page } from "playwright";

export default class District {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async checkErroMessage() {
    await this.page.waitForSelector("div[data-validation]");
    const err = await this.page.$$eval("div[data-validation]", (nodes) =>
      nodes.map((n) => n.getAttribute("data-validation"))
    );
    return err;
  }

  public async getToastMessage() {
    await this.page.waitForSelector("div.ant-notification-notice-description");
    const message = await this.page.$(
      "div.ant-notification-notice-description"
    );
    return await message?.innerText();
  }
}
