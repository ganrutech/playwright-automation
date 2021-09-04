const config = {
  development: {
    baseURL: "http://localhost:8000",
  },
  production: {
    baseURL: "http://192.168.5.59:8000",
  },
};

export default class Environment {
  public static baseURL: string = config.development.baseURL;
}
