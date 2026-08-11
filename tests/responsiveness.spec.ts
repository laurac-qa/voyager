import { test, expect } from "./fixtures";

test.describe("Responsive Layout", () => {
  test("Trip Details page works on mobile", async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/trips/1");

    await expect(
      page.getByRole("heading", {
        name: "Santorini, Greece",
      })
    ).toBeVisible();
  });

  test("Create Trip page is usable on mobile", async ({
    page,
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await page.setViewportSize({
      width: 375,
      height: 667,
    });

    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Verify the form is usable", async () => {
      await expect(page.getByLabel("Trip Title")).toBeVisible();
      await expect(page.getByLabel("Travel Dates")).toBeVisible();
      await expect(page.getByLabel("Trip Summary")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Save Trip" })
      ).toBeVisible();
    });
  });
  test("user can create a trip with emoji", async ({
    page,
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    const tripTitle = `Japan ✈️ 🌸 ${Date.now()}`;

    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Fill in emoji trip details", async () => {
      await createTripPage.fillTrip({
        title: tripTitle,
        dates: "Oct 3 – Oct 12, 2026",
        summary: "🍣 🍜 ⛩️ 🌸 Great food, temples, and autumn colors.",
      });
    });

    await test.step("Save the trip", async () => {
      await createTripPage.clickSave();
    });

    await test.step("Verify the emoji trip appears", async () => {
      await tripsPage.expectLoaded();

      await expect(
        page.getByRole("heading", { name: tripTitle })
      ).toBeVisible();
    });
  });
});