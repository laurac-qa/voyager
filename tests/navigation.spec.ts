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

test("user can open a trip from the home page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1 })
  ).toBeVisible();

  await page.getByRole("link", {
    name: "View Trip",
  }).first().click();

  await expect(page).toHaveURL("/trips/1");

  await expect(
    page.getByRole("heading", {
      name: "Santorini, Greece",
    })
  ).toBeVisible();

  await expect(

    page.getByText(
         "Jun 14 – Jun 21, 2026",
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      "Sunset dinners, cliffside villages, and a sail around the caldera."
    )
  ).toBeVisible();

});