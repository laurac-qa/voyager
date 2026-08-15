import type { Trip } from "../types/trip";

const API_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3001/api";

export async function getTrips(): Promise<Trip[]> {
  const response = await fetch(`${API_URL}/trips`);

  if (!response.ok) {
    throw new Error("Failed to load trips");
  }

  return response.json();
}

export async function getTrip(tripId: string): Promise<Trip> {
  const response = await fetch(`${API_URL}/trips/${tripId}`);

  if (!response.ok) {
    throw new Error("Trip not found");
  }

  return response.json();
}

export async function createTrip(trip: {
  title: string;
  dates: string;
  summary: string;
}): Promise<Trip> {
  const response = await fetch(`${API_URL}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  if (!response.ok) {
    throw new Error("Failed to create trip");
  }

  return response.json();
}

export async function updateTrip(
  tripId: string,
  trip: {
    title: string;
    dates: string;
    summary: string;
  }
): Promise<Trip> {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  if (!response.ok) {
    throw new Error("Failed to update trip");
  }

  return response.json();
}

export async function deleteTrip(tripId: string): Promise<void> {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete trip");
  }
}
