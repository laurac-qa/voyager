import { test, expect } from "@playwright/test";

test("user can start planning a trip", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1 })
  ).toBeVisible();

  await page.getByRole("button", {
    name: "Start Planning",
  }).click();

  await expect(page).toHaveURL("/trips");

  await expect(
    page.getByRole("heading", {
      name: "My Trips",
    })
  ).toBeVisible();
});