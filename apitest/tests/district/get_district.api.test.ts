import { expect, test } from "@playwright/test";

test("Get all districts", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}/district/table`);

  expect(_response.ok()).toBeTruthy();
  const resData = await _response.json();

  expect(resData.districts[0].data).toContainEqual(
    expect.objectContaining({
      district_name: "ANANTHAPUR",
    })
  );
});
