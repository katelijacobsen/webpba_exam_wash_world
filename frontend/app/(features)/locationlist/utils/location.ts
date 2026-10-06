import type { Location } from "../hooks/useFilterLocations";

export type AvailabilityStatus = "success" | "warning" | "danger" | "none";

export type Availability = {
  free: number;
  max: number;
  status: AvailabilityStatus;
};

// The API sends counts as zero-padded strings ("04"); free = max − in use
export function getAvailability(maxValue: string, inUseValue: string): Availability {
  const max = Number(maxValue) || 0;
  const inUse = Math.min(Number(inUseValue) || 0, max);
  const free = max - inUse;

  let status: AvailabilityStatus = "success";
  if (max === 0) status = "none";
  else if (free === 0) status = "danger";
  else if (free / max <= 0.34) status = "warning";

  return { free, max, status };
}

export function locationAvailability(location: Location) {
  return {
    insideClean: getAvailability(location.location_insideclean_max, location.location_insideclean_in_use),
    carWash: getAvailability(location.location_carwash_max, location.location_carwash_in_use),
    selfWash: getAvailability(location.location_selfwash_max, location.location_selfwash_in_use),
  };
}

export type Coords = { latitude: number; longitude: number };

// Great-circle distance in km (haversine)
export function distanceKm(from: Coords, to: Coords): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(to.latitude - from.latitude);
  const dLon = toRad(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.latitude)) * Math.cos(toRad(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// "800 m" / "1,2 km" / "34 km" — Danish decimal comma
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 100) * 10} m`;
  if (km < 10) return `${km.toLocaleString("da-DK", { maximumFractionDigits: 1 })} km`;
  return `${Math.round(km)} km`;
}

export function locationCoords(location: Location): Coords {
  return {
    latitude: Number(location.location_latitude),
    longitude: Number(location.location_longtitude),
  };
}

export function directionsUrl(location: Location, provider: "google" | "apple" = "google") {
  const { latitude, longitude } = locationCoords(location);
  return provider === "google"
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : `https://maps.apple.com/?daddr=${latitude},${longitude}`;
}
