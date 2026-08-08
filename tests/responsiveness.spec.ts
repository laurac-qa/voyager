import { test, expect } from "./fixtures";

test.describe("Responsive Layout", () => {

  test("Trip Details page works on mobile", async ({ page }) => {

    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/trips/1");

    await expect(
      page.getByRole("heading", {
        name: "Santorini, Greece",
      })
    ).toBeVisible();

  });

});