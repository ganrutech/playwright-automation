import { ScenarioObject } from "../../../types/ApiTypes";
import { AuthData } from "../login.common";

export const FailedScenario: ScenarioObject[] = [
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
    data: { username: AuthData.username },
  },
  {
    title: "Request only with Password",
    statusCode: 400,
    message: "Bad Request",
    data: {
      password: AuthData.password,
    },
  },
  {
    title: "Request with Invalid Username/Password",
    statusCode: 401,
    message: "Invalid Email or Password",
    data: {
      username: AuthData.username,
      password: "test@123",
    },
  },
  {
    title: "Request for not registered user",
    statusCode: 404,
    message: "test is not registered",
    data: {
      username: "test",
      password: "test@123",
    },
  },
];
