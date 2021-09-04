const baseURL = "http://localhost:8000";
export default baseURL;

export const launchConfig = { headless: false, slowMo: 80 };

export const contextConfig = {
  recordVideo: {
    dir: "./videos/",
    size: {
      width: 1920,
      height: 1080,
    },
  },
};
