import { test, expect } from "@playwright/test";
import * as testUtils from "./test-utils.js";

let questionName;

test.describe("questions", () => {
  test.beforeEach(async ({ page }) => {
    const credentials = await testUtils.registerNewUser(page);
    await testUtils.login(page, credentials);
    await page.goto("/topics/1");

    questionName = `test-question-${Math.random()}`;
    await page.locator("#inputQuestion").fill(questionName);
    await page.getByRole("button", { name: "Add question" }).click();
  });

  test("can create question", async ({ page }) => {
    await expect(
      page.getByRole("link").filter({ hasText: questionName })
    ).toHaveCount(1);
  });

  test("click on question navigates to question page", async ({ page }) => {
    await page.getByRole("link").filter({ hasText: questionName }).click();

    await expect(
      page.getByRole("heading").filter({ hasText: questionName })
    ).toHaveCount(1);
  });

  test("can delete question question if there are no answer options", async ({
    page,
  }) => {
    await page.getByRole("link").filter({ hasText: questionName }).click();

    await page.getByRole("button", { name: "Delete question" }).click();
    await expect(
      page.getByRole("link").filter({ hasText: questionName })
    ).toHaveCount(0);
  });

  test("can add correct answer option", async ({ page }) => {
    await page.getByRole("link").filter({ hasText: questionName }).click();

    await page.getByPlaceholder("Answer option").fill("correct answer");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Add answer option" }).click();

    await expect(page.getByText("✓ correct answer")).toHaveCount(1);
  });

  test("can delete answer option", async ({ page }) => {
    await page.getByRole("link").filter({ hasText: questionName }).click();

    await page.getByPlaceholder("Answer option").fill("test-answer");
    await page.getByRole("button", { name: "Add answer option" }).click();

    await page
      .locator(".list-group-item")
      .filter({ hasText: "test-answer" })
      .getByRole("button", { name: "Delete" })
      .click();

    await expect(page.getByText("test-answer")).toHaveCount(0);
  });
});
