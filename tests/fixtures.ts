import { test as base } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { TripsPage } from "./pages/TripsPage";
import { TripDetailsPage } from "./pages/TripDetailsPage";
import { CreateTripPage } from "./pages/CreateTripPage";
import { EditTripPage } from "./pages/EditTripPage";

type VoyagerFixtures = {
  homePage: HomePage;
  tripsPage: TripsPage;
  tripDetailsPage: TripDetailsPage;
  createTripPage: CreateTripPage;
  editTripPage: EditTripPage;
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

  createTripPage: async ({ page }, use) => {
    await use(new CreateTripPage(page));
  },

  editTripPage: async ({ page }, use) => {
    await use(new EditTripPage(page));
    },
});

export { expect } from "@playwright/test";