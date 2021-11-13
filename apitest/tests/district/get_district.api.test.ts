import { expect, test } from "@playwright/test";

test("Get all districts", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}/district/table`);
  expect(_response.ok()).toBeTruthy();
  console.log(await _response.json());
});
