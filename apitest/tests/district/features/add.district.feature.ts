import { ScenarioObject } from "../../../types/ApiTypes";

export const FaildScenario: ScenarioObject[] = [
  {
    title: "Should validate empty payload",
    statusCode: 400,
    data: {},
    message: {
      district_name: "District Name is required",
    },
  },
  {
    title: "Should not accept empty spaces",
    statusCode: 400,
    data: {
      district_name: "               ",
    },
    message: {
      district_name: "District Name is required",
    },
  },
  {
    title: "Should not accept special characters",
    statusCode: 400,
    data: {
      district_name: "District@ new!!",
    },
    message: {
      district_name: "District name cannot contain special characters",
    },
  },
];
