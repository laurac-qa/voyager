import { test, expect } from "@playwright/test";

test("API can create a trip", async ({ request }) => {
  const response = await request.post("http://localhost:3001/api/trips", {
    data: {
      title: "Paris, France",
      dates: "Sep 10 – Sep 17, 2026",
      summary: "Museums, cafés, and walks along the Seine.",
    },
  });

  expect(response.status()).toBe(201);

  const trip = await response.json();

  expect(trip).toMatchObject({
    title: "Paris, France",
    dates: "Sep 10 – Sep 17, 2026",
    summary: "Museums, cafés, and walks along the Seine.",
  });

  expect(trip.id).toBeTruthy();
});

test("API can get a trip by ID", async ({ request }) => {
  const response = await request.get(
    "http://localhost:3001/api/trips/1"
  );

  expect(response.status()).toBe(200);

  const trip = await response.json();

  expect(trip).toMatchObject({
    id: "1",
    title: "Santorini, Greece",
    dates: "Jun 14 – Jun 21, 2026",
    summary:
      "Sunset dinners, cliffside villages, and a sail around the caldera.",
  });
});

test("API returns 404 for an invalid trip ID", async ({ request }) => {
  const response = await request.get(
    "http://localhost:3001/api/trips/999"
  );

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body).toEqual({
    message: "Trip not found",
  });
});