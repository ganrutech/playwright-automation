import { test, expect } from "@playwright/test";
import { AddEndpoint } from "./district.common";
import { FaildScenario } from "./features/add.district.feature";
import { districtType } from "./types/DistrictType";

let createPayload: districtType = {
  district_name: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
};

let _district: districtType;

test.beforeAll(async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}/district/table`);

  const resData = await _response.json();
  _district = {
    district_name: resData.districts?.[0]?.data?.[0]?.["district_name"],
  };

  expect(_response.ok()).toBeTruthy();
});

// Add district - Fail Scenario
FaildScenario.forEach((item) => {
  test(item.title, async ({ request, baseURL }) => {
    const _response = await request.post(`${baseURL}${AddEndpoint}`, {
      data: item.data,
    });

    const _message = await _response.json();

    expect(_response.ok()).toBeFalsy();
    expect(_response.status()).toBe(item.statusCode);
    if (typeof item.message === "string") {
      expect(_message.error.message).toBe(item.message);
    } else {
      expect(_message.error.message).toEqual(item.message);
    }
  });
});

// Check duplicate district name
test("Should not accept duplicate district name", async ({
  request,
  baseURL,
}) => {
  const _response = await request.post(`${baseURL}${AddEndpoint}`, {
    data: _district,
  });

  const resData = await _response.json();

  expect(_response.ok()).toBeFalsy();
  expect(_response.status()).toBe(400);
  expect(resData?.error).toHaveProperty(
    "message.district_name",
    `${_district.district_name} district already exists`
  );
});

// Add new district - Valid Scenario
test.skip("Create/Add new district @district @addDistrict", async ({
  request,
  baseURL,
}) => {
  const _response = await request.post(`${baseURL}${AddEndpoint}`, {
    data: createPayload,
  });

  expect(_response.ok()).toBeTruthy();
  expect(_response.status()).toBe(200);
  expect(await _response.json()).toEqual({
    status: "success",
    message: `${createPayload.district_name} district created successfully.`,
  });
});
