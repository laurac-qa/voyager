import { expect, Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/");
  }

  async expectLoaded() {
    await expect(
      this.page.getByRole("heading", { level: 1 })
    ).toBeVisible();
  }

  async clickStartPlanning() {
    await this.page
      .getByRole("button", { name: "Start Planning" })
      .click();
  }

  async openFirstTrip() {
    await this.page
      .getByRole("link", { name: "View Trip" })
      .first()
      .click();
  }
}