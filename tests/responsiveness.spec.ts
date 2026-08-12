import { test, expect } from "./fixtures";

test.describe("Responsive Layout", () => {
  test("Trip Details page works on mobile", async ({
    page,
    request,
  }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    const tripTitle = `Responsive Details Trip ${Date.now()}`;

    const createResponse = await request.post(
      "http://localhost:3001/api/trips",
      {
        data: {
          title: tripTitle,
          dates: "Jun 14 – Jun 21, 2026",
          summary: "Responsive trip details test.",
        },
      }
    );

    expect(createResponse.status()).toBe(201);

    const trip = await createResponse.json();

    await page.goto(`/trips/${trip.id}`);

    await expect(
      page.getByRole("heading", {
        name: tripTitle,
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
        summary:
          "🍣 🍜 ⛩️ 🌸 Great food, temples, and autumn colors.",
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

  test("Edit Trip page is usable on mobile", async ({
    page,
    request,
    homePage,
    tripsPage,
    editTripPage,
  }) => {
    await page.setViewportSize({
      width: 375,
      height: 667,
    });

    const tripTitle = `Responsive Edit Trip ${Date.now()}`;

    const createResponse = await request.post(
      "http://localhost:3001/api/trips",
      {
        data: {
          title: tripTitle,
          dates: "Jun 14 – Jun 21, 2026",
          summary: "Responsive edit test.",
        },
      }
    );

    expect(createResponse.status()).toBe(201);

    const trip = await createResponse.json();

    await test.step("Open the Edit Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickEditTrip(tripTitle);
      await editTripPage.expectLoaded(trip.id);
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
});