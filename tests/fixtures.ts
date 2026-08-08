import { test as base } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { TripsPage } from "./pages/TripsPage";
import { TripDetailsPage } from "./pages/TripDetailsPage";

type VoyagerFixtures = {
  homePage: HomePage;
  tripsPage: TripsPage;
  tripDetailsPage: TripDetailsPage;
};

export const test = base.extend<VoyagerFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  tripsPage: async ({ page }, use) => {
    await use(new TripsPage(page));
  },

  tripDetailsPage: async ({ page }, use) => {
    await use(new TripDetailsPage(page));
  },
});

export { expect } from "@playwright/test";