"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import "mapbox-gl/dist/mapbox-gl.css";
import Icon from "@/app/global/components/Icon";
import type { LocationMapProps } from "../types/location";

// Must be written literally so Next.js inlines it into the browser bundle
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function LocationMap({ latitude, longitude, label }: LocationMapProps) {
  const [failed, setFailed] = useState(false);

  // No token (or Mapbox rejects it) → calm fallback instead of a crashed page
  if (!MAPBOX_TOKEN || failed) {
    return (
      <div className="w-full h-full grid place-items-center bg-[repeating-linear-gradient(45deg,var(--color-grey-50)_0_12px,var(--color-bg)_12px_24px)]">
        <div className="flex flex-col items-center gap-8 text-center px-24 py-16 rounded-4 bg-surface/90 border border-grey-100">
          <Icon iconName="location" style="text-primary-800" />
          <p className="font-bold uppercase text-sm">Kortet kunne ikke indlæses</p>
          <p className="text-sm text-grey-200">
            {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full" role="region" aria-label={`Kort over ${label}`}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude,
          latitude,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        onError={() => setFailed(true)}
        // Don't hijack page scroll on touch devices — two fingers to pan
        cooperativeGestures
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
          <span className="grid place-items-center w-48 h-48 rounded-full bg-primary-400 text-bg-dark border-4 border-white shadow-raised">
            <Icon iconName="location" />
          </span>
        </Marker>
      </Map>
    </div>
  );
}
