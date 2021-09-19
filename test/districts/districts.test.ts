// import { Page } from "playwright";
// import Environment from "../../utils/Environments";
// import District from "../../pages/districts/District.page";
// import LoginPage from "../../pages/Login.page";
// import ReportUtlils from "../../utils/reporterUtils";

// declare const page: Page;
// declare const reporter: any;

// describe("District", () => {
//   let loginPage: LoginPage;
//   let districtPage: District;

//   beforeAll(async () => {
//     await page.goto(Environment.baseURL);
//     loginPage = new LoginPage(page);
//     districtPage = new District(page);
//     // await reporter.description("Create new district").story("WIO-10");
//   });

//   test("Login Success", async () => {
//     await Promise.all([
//       page.waitForNavigation(),
//       loginPage.login("Administrator", "Network@123"),
//     ]);
//   });

//   test("Goto District", async () => {
//     await page.goto(`${Environment.baseURL}/administration/divisions/district`);
//     expect(await page.title()).toBe("AP SDWAN Portal - District Management");
//   });

//   test("Create district modal", async () => {
//     await page.waitForLoadState();
//     await page.click('"Create"');
//     await page.waitForSelector("button[type=submit] span:text('OK')");
//     await page.click("button[type=submit] span:text('OK')");
//   });

//   test("Should district name", async () => {
//     expect(await districtPage.checkErroMessage()).toEqual([
//       '"District Name" is a required field',
//     ]);
//   });

//   test("Should minimum 3 characters required", async () => {
//     await reporter.startStep("Minimum 3 characters required");

//     const district_input = await page.$('input[name="district_name"]');
//     await district_input?.fill("ab");

//     await reporter.endStep();

//     await ReportUtlils.screenshot("MinimumCharacters");

//     expect(await districtPage.checkErroMessage()).toEqual([
//       "Minimum 3 characters required",
//     ]);
//   });

//   test("Should district cannot contain special characters", async () => {
//     const district_input = await page.$('input[name="district_name"]');
//     await district_input?.fill("ab#4$");

//     await ReportUtlils.screenshot("checkSpecialCharacters");

//     expect(await districtPage.checkErroMessage()).toEqual([
//       '"District Name" cannot contain special characters',
//     ]);
//   });
// });
