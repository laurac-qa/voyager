import { expect, Page } from "@playwright/test";
import type { Trip } from "../../src/types/trip";

export class TripDetailsPage {
  constructor(private page: Page) {}

  async expectTrip(trip: Trip) {
    await expect(
      this.page.getByRole("heading", {
        level: 1,
        name: trip.title,
      })
    ).toBeVisible();

    await expect(
      this.page.getByTestId("trip-dates")
    ).toHaveText(trip.dates);

    await expect(
      this.page.getByTestId("trip-summary")
    ).toHaveText(trip.summary);
  }

  async expectTripNotFound() {
  await expect(
    this.page.getByRole("heading", {
      level: 1,
      name: "Trip Not Found",
    })
  ).toBeVisible();
  }
  async goBackToTrips() {
  await this.page.getByRole("link", {
    name: /Back to Trips/,
  }).click();
  }
}
