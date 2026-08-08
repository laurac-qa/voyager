import { test } from "./fixtures";

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

  test("user can open a trip from the home page", async ({ homePage, tripDetailsPage }) => {

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
        summary: "Sunset dinners, cliffside villages, and a sail around the caldera.",
      });
    }); 
  });

  test("user sees Trip Not Found for an invalid trip", async ({ page, tripDetailsPage }) => {

    await test.step("Open an invalid trip URL", async () => {
      await page.goto("/trips/999");
    });

    await test.step("Verify Trip Not Found is displayed", async () => {
      await tripDetailsPage.expectTripNotFound();
    });
  });
});