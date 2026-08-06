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
}