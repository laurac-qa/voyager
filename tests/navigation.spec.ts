import { test, expect } from "./fixtures";

test.describe("Navigation", () => {
  test("user can start planning a trip", async ({ homePage, tripsPage }) => {
    await test.step("Open the home page", async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });

    await test.step("Click start planning", async () => {
      await homePage.clickStartPlanning();
    });

    await test.step("Verify Trips page is displayed", async () => {
      await tripsPage.expectLoaded();
    });
  });

  test("user can open a trip from the home page", async ({
    homePage,
    tripDetailsPage,
  }) => {
    await test.step("Open the home page", async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });

    await test.step("Open the first trip", async () => {
      await homePage.openFirstTrip();
    });

    await test.step("Verify trip details", async () => {
      await tripDetailsPage.expectTrip({
        id: "1",
        title: "Santorini, Greece",
        dates: "Jun 14 – Jun 21, 2026",
        summary:
          "Sunset dinners, cliffside villages, and a sail around the caldera.",
      });
    });
  });

  test("user can see the Create Trip action", async ({
    homePage,
    tripsPage,
  }) => {
    await test.step("Open the Trips page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
    });

    await test.step("Verify Create Trip action is available", async () => {
      await tripsPage.expectCreateTripButton();
    });
  });

  test("user can access Create Trip", async ({ homePage, tripsPage }) => {
    await test.step("Open the Trips page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
    });

    await test.step("Open Create Trip", async () => {
      await tripsPage.clickCreateTrip();
    });

    await test.step("Verify Create Trip page", async () => {
      await tripsPage.expectCreateTripPage();
    });
  });

  test("user can see the Create Trip form", async ({
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Verify the form fields", async () => {
      await createTripPage.expectFormFields();
    });
  });

  test("user cannot submit an empty Create Trip form", async ({
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Verify required fields", async () => {
      await createTripPage.expectRequiredFields();
    });
  });

  test("user can create a trip", async ({
    page,
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    const tripTitle = `Test Paris ${Date.now()}`;

    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Fill in the trip details", async () => {
      await createTripPage.fillTrip({
        title: tripTitle,
        dates: "Sep 10 – Sep 17, 2026",
        summary: "QA test trip",
      });
    });

    await test.step("Save the trip", async () => {
      await createTripPage.clickSave();
    });

    await test.step("Verify the trip appears in My Trips", async () => {
      await tripsPage.expectLoaded();

      await expect(
        page.getByRole("heading", { name: tripTitle })
      ).toBeVisible();
    });
  });

  test("user sees Trip Not Found for an invalid trip", async ({
    page,
    tripDetailsPage,
  }) => {
    await test.step("Open an invalid trip URL", async () => {
      await page.goto("/trips/999");
    });

    await test.step("Verify Trip Not Found is displayed", async () => {
      await tripDetailsPage.expectTripNotFound();
    });
  });

  test("user can return to Trips from Trip Details", async ({
    homePage,
    tripDetailsPage,
    tripsPage,
  }) => {
    await test.step("Open the home page", async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });

    await test.step("Open the first trip", async () => {
      await homePage.openFirstTrip();
    });

    await test.step("Return to Trips", async () => {
      await tripDetailsPage.goBackToTrips();
    });

    await test.step("Verify Trips page is displayed", async () => {
      await tripsPage.expectLoaded();
    });
  });

  test("user sees an error when trip creation fails", async ({
    page,
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await test.step("Simulate trip creation failure", async () => {
      await page.route("**/api/trips", async (route) => {
        if (route.request().method() === "POST") {
          await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({
              message: "Internal Server Error",
            }),
          });
        } else {
          await route.continue();
        }
      });
    });

    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Fill in the trip details", async () => {
      await createTripPage.fillTrip({
        title: "API Failure Test",
        dates: "Sep 10 – Sep 17, 2026",
        summary: "Testing service failure handling.",
      });
    });

    await test.step("Save the trip", async () => {
      await createTripPage.clickSave();
    });

    await test.step("Verify the error message", async () => {
      await expect(page.getByRole("alert")).toHaveText(
        "Unable to create trip. Please try again."
      );

      await expect(page).toHaveURL("/trips/new");
    });
  });

  test("user cannot exceed the trip title length limit", async ({
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Verify the title length limit", async () => {
      await createTripPage.expectTitleMaxLength();
    });
  });

  test("user cannot exceed the travel dates length limit", async ({
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Verify the travel dates length limit", async () => {
      await createTripPage.expectDatesMaxLength();
    });
  });

  test("user cannot exceed the trip summary length limit", async ({
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Verify the trip summary length limit", async () => {
      await createTripPage.expectSummaryMaxLength();
    });
  });

  test("user can create a trip with Japanese characters", async ({
    page,
    homePage,
    tripsPage,
    createTripPage,
  }) => {
    const tripTitle = `京都旅行 ${Date.now()}`;

    await test.step("Open the Create Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
      await tripsPage.clickCreateTrip();
      await createTripPage.expectLoaded();
    });

    await test.step("Fill in Japanese trip details", async () => {
      await createTripPage.fillTrip({
        title: tripTitle,
        dates: "2026年10月3日 – 2026年10月12日",
        summary: "寺院、紅葉、そして美味しい料理を楽しむ旅行。",
      });
    });

    await test.step("Save the trip", async () => {
      await createTripPage.clickSave();
    });

    await test.step("Verify the Japanese trip appears", async () => {
      await tripsPage.expectLoaded();

      await expect(
        page.getByRole("heading", { name: tripTitle })
      ).toBeVisible();
    });
  });

  test("user can access Edit Trip", async ({
    page,
    request,
    homePage,
    tripsPage,
    tripDetailsPage,
    editTripPage,
  }) => {
    const tripTitle = `Edit Test Trip ${Date.now()}`;
    const updatedTitle = `Updated ${tripTitle}`;

    const createResponse = await request.post(
      "http://localhost:3001/api/trips",
      {
        data: {
          title: tripTitle,
          dates: "Jun 14 – Jun 21, 2026",
          summary: "Trip created for edit testing.",
        },
      }
    );

    expect(createResponse.status()).toBe(201);

    const trip = await createResponse.json();

    await test.step("Open My Trips", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();
    });

    await test.step("Open the trip details", async () => {
      await tripsPage.clickViewTrip(tripTitle);
    });

    await test.step("Verify Trip Details page", async () => {
      await tripDetailsPage.expectTrip({
        id: String(trip.id),
        title: tripTitle,
        dates: "Jun 14 – Jun 21, 2026",
        summary: "Trip created for edit testing.",
      });
    });

    await test.step("Verify Edit Trip action", async () => {
      await tripDetailsPage.expectEditTripButton();
    });

    await test.step("Open Edit Trip", async () => {
      await tripDetailsPage.clickEditTrip();
    });

    await test.step("Verify Edit Trip page", async () => {
      await editTripPage.expectLoaded(trip.id);

      await editTripPage.expectTripValues({
        title: tripTitle,
        dates: "Jun 14 – Jun 21, 2026",
        summary: "Trip created for edit testing.",
      });
    });

    await test.step("Update the trip", async () => {
      await editTripPage.fillTrip({
        title: updatedTitle,
        dates: "Jun 14 – Jun 21, 2026",
        summary: "Trip created for edit testing.",
      });

      await editTripPage.clickSave();
    });

    await test.step("Verify the updated trip appears", async () => {
      await tripsPage.expectLoaded();

      await expect(
        page.getByRole("heading", {
          name: updatedTitle,
        })
      ).toBeVisible();

      const updatedResponse = await request.get(
        `http://localhost:3001/api/trips/${trip.id}`
      );

      expect(updatedResponse.status()).toBe(200);

      const updatedTrip = await updatedResponse.json();

      expect(updatedTrip).toMatchObject({
        id: trip.id,
        title: updatedTitle,
        dates: "Jun 14 – Jun 21, 2026",
        summary: "Trip created for edit testing.",
      });
    });
  });

  test("user cannot submit an empty Edit Trip form", async ({
    page,
    request,
    homePage,
    tripsPage,
    tripDetailsPage,
    editTripPage,
  }) => {
    const tripTitle = `Edit Validation Trip ${Date.now()}`;

    const createResponse = await request.post(
      "http://localhost:3001/api/trips",
      {
        data: {
          title: tripTitle,
          dates: "Jun 14 – Jun 21, 2026",
          summary: "Trip created for validation testing.",
        },
      }
    );

    expect(createResponse.status()).toBe(201);

    const trip = await createResponse.json();

    await test.step("Open the Edit Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();

      await tripsPage.clickViewTrip(tripTitle);

      await tripDetailsPage.expectTrip({
        id: String(trip.id),
        title: tripTitle,
        dates: "Jun 14 – Jun 21, 2026",
        summary: "Trip created for validation testing.",
      });

      await tripDetailsPage.clickEditTrip();
      await editTripPage.expectLoaded(trip.id);
    });

    await test.step("Clear the required fields", async () => {
      await page.getByLabel("Trip Title").fill("");
      await page.getByLabel("Travel Dates").fill("");
      await page.getByLabel("Trip Summary").fill("");
    });

    await test.step("Verify required-field validation", async () => {
      await editTripPage.clickSave();

      await expect(page).toHaveURL(
        new RegExp(`/trips/${trip.id}/edit`)
      );

      await expect(
        page.getByLabel("Trip Title")
      ).toHaveAttribute("required", "");

      await expect(
        page.getByLabel("Travel Dates")
      ).toHaveAttribute("required", "");

      await expect(
        page.getByLabel("Trip Summary")
      ).toHaveAttribute("required", "");
    });
  });

  test("user sees an error when trip update fails", async ({
    page,
    request,
    homePage,
    tripsPage,
    tripDetailsPage,
    editTripPage,
  }) => {
    const tripTitle = `Edit API Failure ${Date.now()}`;

    const createResponse = await request.post(
      "http://localhost:3001/api/trips",
      {
        data: {
          title: tripTitle,
          dates: "Jun 14 – Jun 21, 2026",
          summary: "Trip created for API failure testing.",
        },
      }
    );

    expect(createResponse.status()).toBe(201);

    const trip = await createResponse.json();

    await test.step("Open the Edit Trip page", async () => {
      await homePage.open();
      await homePage.clickStartPlanning();
      await tripsPage.expectLoaded();

      await tripsPage.clickViewTrip(tripTitle);

      await tripDetailsPage.expectTrip({
        id: String(trip.id),
        title: tripTitle,
        dates: "Jun 14 – Jun 21, 2026",
        summary: "Trip created for API failure testing.",
      });

      await tripDetailsPage.clickEditTrip();
      await editTripPage.expectLoaded(trip.id);
    });

    await test.step("Simulate trip update failure", async () => {
      await page.route("**/api/trips/*", async (route) => {
        if (route.request().method() === "PUT") {
          await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({
              message: "Internal Server Error",
            }),
          });
        } else {
          await route.continue();
        }
      });
    });

    await test.step("Update the trip", async () => {
      await page.getByLabel("Trip Title").fill("Failed Update Trip");
      await editTripPage.clickSave();
    });

    await test.step("Verify the error message", async () => {
      await expect(page).toHaveURL(
        new RegExp(`/trips/${trip.id}/edit`)
      );

      await expect(page.getByRole("alert")).toHaveText(
        "Unable to update trip. Please try again."
      );
    });
  });
});