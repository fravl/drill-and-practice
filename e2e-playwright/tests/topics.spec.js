import { test, expect } from "@playwright/test";
import * as testUtils from "./test-utils.js";

test.describe("topics", () => {
  test.beforeEach(async ({ page }) => {
    await testUtils.login(page, {
      email: "admin@admin.com",
      password: "123456",
    });
  });

  test("admin can create topics", async ({ page }) => {
    const topicName = `test-topic-${Math.random()}`;
    await page.locator("#inputTopic").fill(topicName);
    await page.getByRole("button", { name: "Add topic" }).click();

    await expect(
      page.getByRole("link").filter({ hasText: topicName })
    ).toHaveCount(1);
  });

  test("admin can delete topics", async ({ page }) => {
    const topicName = `test-topic-${Math.random()}`;
    await page.locator("#inputTopic").fill(topicName);
    await page.getByRole("button", { name: "Add topic" }).click();

    await page
      .getByRole("link")
      .filter({ hasText: topicName })
      .getByRole("button", { name: "Delete" })
      .click();

    await expect(
      page.getByRole("link").filter({ hasText: topicName })
    ).toHaveCount(0);
  });

  test("click on topic navigates to topic details page", async ({ page }) => {
    const topicName = `test-topic-${Math.random()}`;
    await page.locator("#inputTopic").fill(topicName);
    await page.getByRole("button", { name: "Add topic" }).click();

    await page.getByRole("link").filter({ hasText: topicName }).click();

    await expect(
      page.getByRole("heading").filter({ hasText: topicName })
    ).toHaveCount(1);
  });
});
