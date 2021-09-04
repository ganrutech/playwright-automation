import { Page } from "playwright";

declare const page: Page;
declare const reporter: any;

export default class ReportUtlils {
  public static async screenshot(filename?: string) {
    const screenshotBuffer = await page.screenshot();
    const fName = filename ? filename : "screenshot";
    await reporter.addAttachment(fName, screenshotBuffer, "image/png");
  }
}
