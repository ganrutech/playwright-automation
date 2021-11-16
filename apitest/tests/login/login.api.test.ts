import { expect, test } from "@playwright/test";
var fs = require("fs");

import { FailedScenario } from "./features/login.feature";
import { AuthData, EndPoint } from "./login.common";

test.describe("Login API", () => {
  //   Failed Scenario
  FailedScenario.forEach((item) => {
    test(item.title, async ({ request, baseURL }) => {
      if (item.skip) test.skip();
      const _response = await request.post(`${baseURL}${EndPoint}`, {
        data: item.data,
      });

      const _message = await _response.json();

      expect(_response.ok()).toBeFalsy();
      expect(_response.status()).toBe(item.statusCode);
      expect(_message.error.message).toBe(item.message);
    });
  });

  //   Success scenario
  test("should login success @login-success", async ({ request, baseURL }) => {
    const _response = await request.post(`${baseURL}${EndPoint}`, {
      data: AuthData,
    });

    const jsonData = await _response.json();

    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(200);

    fs.writeFile("apiToken.json", JSON.stringify(jsonData), (err: any) => {
      if (err) throw err;
    });
  });
});
