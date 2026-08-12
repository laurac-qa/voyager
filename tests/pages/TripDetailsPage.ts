import { expect, Page } from "@playwright/test";

export class TripDetailsPage {
  constructor(private page: Page) {}

  async expectTrip({
    id,
    title,
    dates,
    summary,
  }: {
    id: string;
    title: string;
    dates: string;
    summary: string;
  }) {
    await expect(this.page).toHaveURL(`/trips/${id}`);

    await expect(
      this.page.getByRole("heading", {
        name: title,
        level: 1,
      })
    ).toBeVisible();

    await expect(
      this.page.getByTestId("trip-dates")
    ).toHaveText(dates);

    await expect(
      this.page.getByTestId("trip-summary")
    ).toHaveText(summary);
  }

  async expectTripNotFound() {
    await expect(
      this.page.getByRole("heading", {
        name: "Trip Not Found",
      })
    ).toBeVisible();
  }

  async goBackToTrips() {
    await this.page.getByRole("link", {
      name: "Back to Trips",
    }).click();
  }

  async expectEditTripButton() {
    await expect(
      this.page.getByRole("link", {
        name: "Edit Trip",
      })
    ).toBeVisible();
  }

  async clickEditTrip() {
    await this.page.getByRole("link", {
      name: "Edit Trip",
    }).click();
  }
}