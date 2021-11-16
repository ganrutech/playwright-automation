import { expect, test } from "@playwright/test";
import { districtType } from "./types/DistrictType";

let districtObj: districtType;

// Get all district
test("GET all districts @district @getDistrict", async ({
  request,
  baseURL,
}) => {
  const _response = await request.get(`${baseURL}/district/table`);

  const resData = await _response.json();
  districtObj = {
    _id: resData.districts?.[0]?.data?.[0]?.["_id"],
    district_name: resData.districts?.[0]?.data?.[0]?.["district_name"],
  };

  expect(_response.ok()).toBeTruthy();
  expect(_response.status()).toBe(200);
  expect(resData.districts?.[0]?.data).toContainEqual(
    expect.objectContaining({
      district_name: "ANANTHAPUR",
    })
  );
});

// Get district by ID
test("GET district by ID @district @getDistrict", async ({
  request,
  baseURL,
}) => {
  if (!districtObj._id) test.skip();

  const _response = await request.get(
    `${baseURL}/district/${districtObj?._id}`
  );
  const resData = await _response.json();

  expect(_response.ok()).toBeTruthy();
  expect(_response.status()).toBe(200);
  expect(resData?.data).toEqual(districtObj);
});

// Get district by Invalid ID
test("GET district by Invalid ID @district @getDistrict @failCase", async ({
  request,
  baseURL,
}) => {
  const _response = await request.get(`${baseURL}/district/2`);
  const resData = await _response.json();

  expect(_response.ok()).toBeFalsy();
  expect(_response.status()).toBe(400);
  expect(resData?.error).toEqual({
    code: 400,
    message: "Invalid ID or Object",
  });
});
