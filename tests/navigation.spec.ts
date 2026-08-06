import { test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { TripsPage } from "./pages/TripsPage";
import { TripDetailsPage } from "./pages/TripDetailsPage";

test("user can start planning a trip", async ({ page }) => {
  const homePage = new HomePage(page);
  const tripsPage = new TripsPage(page);

  await homePage.open();
  await homePage.expectLoaded();

  await homePage.clickStartPlanning();

  await tripsPage.expectLoaded();
});

test("user can open a trip from the home page", async ({ page }) => {
  const homePage = new HomePage(page);
  const tripDetailsPage = new TripDetailsPage(page);

  await homePage.open();
  await homePage.expectLoaded();

  await homePage.openFirstTrip();

  await tripDetailsPage.expectTrip({
    id: "1",
    title: "Santorini, Greece",
    dates: "Jun 14 – Jun 21, 2026",
    summary: "Sunset dinners, cliffside villages, and a sail around the caldera.",
  });
});