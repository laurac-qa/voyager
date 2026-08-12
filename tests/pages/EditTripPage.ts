import { expect, Page } from "@playwright/test";

export class EditTripPage {
  constructor(private page: Page) {}

  async expectLoaded(tripId: number | string) {
    await expect(this.page).toHaveURL(
      new RegExp(`/trips/${tripId}/edit`)
    );

    await expect(
    this.page.getByRole("heading", {
        name: "Edit Trip",
        exact: true,
    })
    ).toBeVisible();
  }

  async expectTripValues({
    title,
    dates,
    summary,
  }: {
    title: string;
    dates: string;
    summary: string;
  }) {
    await expect(
      this.page.getByLabel("Trip Title")
    ).toHaveValue(title);

    await expect(
      this.page.getByLabel("Travel Dates")
    ).toHaveValue(dates);

    await expect(
      this.page.getByLabel("Trip Summary")
    ).toHaveValue(summary);
  }

  async fillTrip({
    title,
    dates,
    summary,
  }: {
    title: string;
    dates: string;
    summary: string;
  }) {
    await this.page.getByLabel("Trip Title").fill(title);
    await this.page.getByLabel("Travel Dates").fill(dates);
    await this.page.getByLabel("Trip Summary").fill(summary);
  }

  async clickSave() {
    await this.page.getByRole("button", {
      name: "Save Trip",
    }).click();
  }

  async expectTitleMaxLength() {
    await expect(
      this.page.getByLabel("Trip Title")
    ).toHaveAttribute("maxlength", "100");
  }

  async expectDatesMaxLength() {
    await expect(
      this.page.getByLabel("Travel Dates")
    ).toHaveAttribute("maxlength", "50");
  }

  async expectSummaryMaxLength() {
    await expect(
      this.page.getByLabel("Trip Summary")
    ).toHaveAttribute("maxlength", "500");
  }
}