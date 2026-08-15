import { expect, Page } from "@playwright/test";

export class TripsPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL("/trips");

    await expect(
      this.page.getByRole("heading", {
        name: "My Trips",
      })
    ).toBeVisible();
  }
  async expectCreateTripButton() {
    await expect(
      this.page.getByTestId("create-trip-button")
    ).toBeVisible();
  }
  async clickCreateTrip() {
  await this.page.getByRole("link", { name: "Create Trip" }).click();
  }


  async expectCreateTripPage() {
    await expect(this.page).toHaveURL("/trips/new");

    await expect(
      this.page.getByRole("heading", {
        name: "Create Trip",
      })
    ).toBeVisible();
  }

  async clickViewTrip(tripTitle: string) {
    const tripCard = this.page
      .locator("article")
      .filter({
        has: this.page.getByRole("heading", {
          name: tripTitle,
        }),
      });

    await tripCard.getByRole("link", { name: "View Trip" }).click();
  }
}