"use client";

import { useState } from "react";
import type { Coords } from "../utils/location";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; coords: Coords }
  | { status: "error"; message: string };

// Asks for the user's position only when they click — never on page load
export function useUserPosition() {
  const [state, setState] = useState<State>({ status: "idle" });

  function request() {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", message: "Din browser understøtter ikke placering." });
      return;
    }
    setState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setState({
          status: "success",
          coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        }),
      (err) =>
        setState({
          status: "error",
          message:
            err.code === err.PERMISSION_DENIED
              ? "Du har ikke givet adgang til din placering."
              : "Vi kunne ikke finde din placering. Prøv igen.",
        }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }

  return { state, request, reset: () => setState({ status: "idle" }) };
}
