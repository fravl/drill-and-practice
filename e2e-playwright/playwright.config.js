export const timeout = 10000;
export const retries = 0;
export const reporter = "list";
export const workers = 5;
export const use = {
  baseURL: "http://localhost:7777",
  headless: true,
  ignoreHTTPSErrors: true,
};
export const projects = [
  {
    name: "e2e-headless-chromium",
    use: {
      browserName: "chromium",
    },
  },
];
