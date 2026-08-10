import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3001/api/trips";

test("API can create and retrieve a trip", async ({ request }) => {
  const tripData = {
    title: `API Test Trip ${Date.now()}`,
    dates: "Sep 10 – Sep 17, 2026",
    summary: "Museums, cafés, and walks along the Seine.",
  };

  const createResponse = await request.post(API_URL, {
    data: tripData,
  });

  expect(createResponse.status()).toBe(201);

  const createdTrip = await createResponse.json();

  expect(createdTrip).toMatchObject(tripData);
  expect(createdTrip.id).toBeTruthy();

  const getResponse = await request.get(
    `${API_URL}/${createdTrip.id}`
  );

  expect(getResponse.status()).toBe(200);

  const retrievedTrip = await getResponse.json();

  expect(retrievedTrip).toEqual(createdTrip);
});

test("API returns 404 for an invalid trip ID", async ({ request }) => {
  const response = await request.get(`${API_URL}/999999`);

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body).toEqual({
    message: "Trip not found",
  });
});