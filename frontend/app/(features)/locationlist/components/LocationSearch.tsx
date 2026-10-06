"use client";

import { useMemo, useState } from "react";
import Card from "./Card";
import type { Location } from "../hooks/useFilterLocations";
import { useFilterLocations } from "../hooks/useFilterLocations";
import { useUserPosition } from "../hooks/useUserPosition";
import { distanceKm, locationCoords } from "../utils/location";
import Icon from "@/app/global/components/Icon";
import Button from "@/app/global/components/Button";

interface LocationSearchProps {
  locations: Location[];
}

const PAGE_SIZE = 12;

const LocationSearch = ({ locations }: LocationSearchProps) => {
  const { search, setSearch, filteredLocations, filter, setFilter, filters } =
    useFilterLocations(locations);
  const position = useUserPosition();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const coords = position.state.status === "success" ? position.state.coords : null;

  // Attach distances (when known) and sort nearest first
  const results = useMemo(() => {
    const withDistance = filteredLocations.map((location) => ({
      location,
      distance: coords ? distanceKm(coords, locationCoords(location)) : undefined,
    }));
    if (coords) withDistance.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    return withDistance;
  }, [filteredLocations, coords]);

  const shown = results.slice(0, visible);
  const remaining = results.length - shown.length;

  function updateSearch(value: string) {
    setSearch(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="flex flex-col gap-24">
      {/* Toolbar — sticks under the header so search is always reachable */}
      <div className="sticky top-[var(--header-h)] z-10 -mx-16 px-16 py-12 bg-bg/95 backdrop-blur-md sm:-mx-24 sm:px-24 lg:mx-0 lg:px-0">
        <search className="flex flex-col gap-12 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor="location-search" className="sr-only">
              Søg efter vaskehal
            </label>
            <Icon
              iconName="search"
              size="sm"
              style="absolute left-16 top-1/2 -translate-y-1/2 text-primary-800 pointer-events-none"
            />
            <input
              id="location-search"
              type="search"
              placeholder="Søg på by eller adresse"
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
              className="field w-full min-h-48 pl-48 pr-16 py-12 placeholder:text-grey-200 [&::-webkit-search-cancel-button]:cursor-pointer"
            />
          </div>

          <div className="flex gap-12">
            {/* Only worth showing when the API actually returns regions */}
            {filters.length > 2 && (
              <div className="flex-1 sm:flex-none">
                <label htmlFor="region-filter" className="sr-only">
                  Region
                </label>
                <select
                  id="region-filter"
                  value={filter}
                  onChange={(event) => {
                    setFilter(event.target.value);
                    setVisible(PAGE_SIZE);
                  }}
                  className="field w-full min-h-48 px-12 font-bold uppercase text-sm"
                >
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter === "Alle" ? "Alle regioner" : filter}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              aria-pressed={!!coords}
              onClick={() => (coords ? position.reset() : position.request())}
              disabled={position.state.status === "loading"}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-8 min-h-48 px-16 rounded-2 border-2 font-bold uppercase text-sm whitespace-nowrap ${
                coords
                  ? "bg-primary-400 border-primary-400 text-bg-dark bevel"
                  : "bg-primary-50 border-primary-100 text-primary-800 hover:bg-primary-100"
              } disabled:opacity-60`}
            >
              <Icon iconName="location" size="sm" />
              {position.state.status === "loading" ? "Finder dig…" : "Nærmest mig"}
            </button>
          </div>
        </search>

        {position.state.status === "error" && (
          <p role="alert" className="mt-8 flex items-center gap-6 text-sm font-medium text-danger-text">
            <Icon iconName="circleerror" size="xs" /> {position.state.message}
          </p>
        )}
      </div>

      <p aria-live="polite" className="text-sm font-bold uppercase tracking-[0.04em] text-grey-200 -mt-12">
        {results.length === 1 ? "1 vaskehal" : `${results.length} vaskehaller`}
        {coords && " · sorteret efter afstand"}
      </p>

      {results.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-12 py-48 px-16 rounded-2 border-2 border-dashed border-grey-100">
          <span className="grid place-items-center w-64 h-64 rounded-full bg-primary-50 text-primary-800">
            <Icon iconName="search" />
          </span>
          <h2 className="text-md font-bold uppercase">Ingen vaskehaller fundet</h2>
          <p className="text-grey-200 max-w-[36ch]">
            Vi kunne ikke finde noget, der matcher “{search}”. Prøv en anden by eller adresse.
          </p>
          <Button size="sm" type="secondary" buttonName="Ryd søgning" onClick={() => updateSearch("")} />
        </div>
      ) : (
        <ul className="grid gap-16 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map(({ location, distance }) => (
            <li key={location.location_pk} className="animate-rise">
              <Card location={location} distanceKm={distance} />
            </li>
          ))}
        </ul>
      )}

      {remaining > 0 && (
        <div className="flex justify-center">
          <Button
            size="sm"
            type="secondary"
            buttonName={`Vis flere (${remaining})`}
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          />
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
