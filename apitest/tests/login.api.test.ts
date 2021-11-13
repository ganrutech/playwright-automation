import { expect, test } from "@playwright/test";
import { ScenarioObject } from "../types/ApiTypes";
var fs = require("fs");

const _FailedScenario: ScenarioObject[] = [
  {
    title: "Empty request body",
    statusCode: 400,
    message: "Bad Request",
    data: {},
  },
  {
    title: "Request only with Username",
    statusCode: 400,
    message: "Bad Request",
    data: { username: "Administrator" },
  },
  {
    title: "Request only with Password",
    statusCode: 400,
    message: "Bad Request",
    data: {
      password: "Network@123",
    },
  },
];

const EndPoint = "/login";
const AuthData = {
  username: "Administrator",
  password: "Network@123",
};

test.describe("Login API", () => {
  //   Failed Scenario
  _FailedScenario.forEach((item) => {
    test(item.title, async ({ request, baseURL }) => {
      const _response = await request.post(`${baseURL}${EndPoint}`, {
        data: item.data,
      });
      //   expect(_response.ok()).toBeTruthy();
      const _message = await _response.json();
      expect(_response.status()).toBe(item.statusCode);
      expect(_message.error.message).toBe(item.message);
    });
  });

  //   Success scenario
  test("should login success", async ({ request, baseURL }) => {
    const _response = await request.post(`${baseURL}${EndPoint}`, {
      data: AuthData,
    });
    expect(_response.ok()).toBeTruthy();

    const jsonData = await _response.json();
    fs.writeFile("apiToken.json", JSON.stringify(jsonData), (err: any) => {
      if (err) throw err;
    });
  });
});
