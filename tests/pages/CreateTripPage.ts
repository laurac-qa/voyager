import { expect, type Page } from "@playwright/test";

export class CreateTripPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL("/trips/new");

    await expect(
      this.page.getByRole("heading", {
        name: "Create Trip",
      })
    ).toBeVisible();
  }

  async expectFormFields() {
    await expect(
      this.page.getByLabel("Trip Title")
    ).toBeVisible();

    await expect(
      this.page.getByLabel("Travel Dates")
    ).toBeVisible();

    await expect(
      this.page.getByLabel("Trip Summary")
    ).toBeVisible();

    await expect(
      this.page.getByRole("button", {
        name: "Save Trip",
      })
    ).toBeVisible();
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

  async expectRequiredFields() {
    await expect(
      this.page.getByLabel("Trip Title")
    ).toHaveAttribute("required", "");

    await expect(
      this.page.getByLabel("Travel Dates")
    ).toHaveAttribute("required", "");

    await expect(
      this.page.getByLabel("Trip Summary")
    ).toHaveAttribute("required", "");
  }

  async expectFormNotSubmitted() {
    await expect(this.page).toHaveURL("/trips/new");
  }

  async expectTitleMaxLength() {
    const titleInput = this.page.getByLabel("Trip Title");

    await titleInput.fill("A".repeat(101));

    await expect(titleInput).toHaveValue("A".repeat(100));
  }

  async expectDatesMaxLength() {
    const datesInput = this.page.getByLabel("Travel Dates");

    await datesInput.fill("A".repeat(51));

    await expect(datesInput).toHaveValue("A".repeat(50));
  }

  async expectSummaryMaxLength() {
    const summaryInput = this.page.getByLabel("Trip Summary");

    await summaryInput.fill("A".repeat(501));

    await expect(summaryInput).toHaveValue("A".repeat(500));
  }
}

