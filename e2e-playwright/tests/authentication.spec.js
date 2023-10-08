import { test, expect } from "@playwright/test";
import * as testUtils from "./test-utils.js";

test.describe("authentication", () => {
  test("Can register and login", async ({ page }) => {
    const credentials = await testUtils.registerNewUser(page);
    await expect(page.getByRole("heading")).toHaveText("Login");

    await testUtils.login(page, credentials);

    await expect(page.getByRole("heading")).toHaveText("Topics");
  });

  test("Topics and quiz are protected", async ({ page }) => {
    await page.goto("/topics");

    await expect(page.getByRole("heading")).toHaveText("Login");

    await page.goto("/quiz");

    await expect(page.getByRole("heading")).toHaveText("Login");
  });
});
