"use client";

import { useState } from "react";

export type Location = {
  location_pk: string;
  location_title: string;
  location_city: string;
  location_address: string;
  location_region: string;
  location_latitude: string;
  location_longtitude: string;
  location_carwash_max: string;
  location_carwash_in_use: string;
  location_selfwash_max: string;
  location_selfwash_in_use: string;
  location_insideclean_max: string;
  location_insideclean_in_use: string;
};

export function useFilterLocations(locations: Location[]) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Alle");

  const searchValue = search.trim().toLowerCase();

  const filters = [
    "Alle",
    ...new Set(
      locations.map((location) => location.location_region).filter(Boolean),
    ),
  ];

  // Region must always match; the search text can match title, city or address
  const filteredLocations = locations.filter(
    (loc) =>
      (filter === "Alle" || loc.location_region === filter) &&
      (loc.location_title.toLowerCase().includes(searchValue) ||
        loc.location_city.toLowerCase().includes(searchValue) ||
        loc.location_address.toLowerCase().includes(searchValue)),
  );

  return {
    filteredLocations,
    search,
    setSearch,
    filter,
    setFilter,
    filters
  };
}
