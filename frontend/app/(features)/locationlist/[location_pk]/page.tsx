"use client";
import { useParams } from "next/navigation";
import LocationMap from "../components/LocationMap";
import { useSingleLocation } from "../hooks/useSingleLocation";
import Header from "@/app/global/components/Header";
import Button from "@/app/global/components/Button";
import Icon from "@/app/global/components/Icon";
import { useDrag } from "../hooks/useDrag";
import AvailabilityStrip from "../components/AvailabilityStrip";
import { directionsUrl, locationAvailability, type Availability } from "../utils/location";

const statusText: Record<Availability["status"], { text: string; dot: string }> = {
  success: { text: "Ledig", dot: "bg-success" },
  warning: { text: "Få ledige", dot: "bg-warning" },
  danger: { text: "Optaget", dot: "bg-danger" },
  none: { text: "Findes ikke her", dot: "bg-grey-100" },
};

function StatRow({ label, iconName, availability }: { label: string; iconName: string; availability: Availability }) {
  const status = statusText[availability.status];
  return (
    <div className="flex items-center gap-12 py-12">
      <span className="grid place-items-center w-40 h-40 rounded-2 bg-primary-50 text-primary-800 shrink-0">
        <Icon iconName={iconName} size="sm" />
      </span>
      <dt className="flex-1 font-bold uppercase text-sm">{label}</dt>
      <dd className="flex items-center gap-8 text-sm text-right">
        <span className="flex items-center gap-6 text-grey-200">
          <span aria-hidden="true" className={`w-8 h-8 rounded-full ${status.dot}`} />
          {status.text}
        </span>
        {availability.status !== "none" && (
          <span className="font-bold tabular-nums min-w-[3ch]">
            {availability.free}/{availability.max}
          </span>
        )}
      </dd>
    </div>
  );
}

export default function SingleLocationPage() {
  const { location_pk } = useParams<{ location_pk: string }>();
  const { data: location, isPending, isError, refetch } = useSingleLocation(location_pk);
  // Collapsed sheet keeps title + handle visible above the floating nav
  const { sheetStyle, handleProps, isOpen } = useDrag("calc(var(--nav-h) + env(safe-area-inset-bottom) + 112px)");

  if (isPending) {
    return (
      <>
        <Header title="Vaskehal" back="/locationlist" />
        <main className="container-page py-24 pb-nav" aria-busy="true">
          <span className="sr-only" role="status">Henter vaskehal…</span>
          <div className="animate-pulse grid gap-16 lg:grid-cols-[24rem_1fr]">
            <div className="grid gap-12 content-start">
              <div className="h-24 w-1/2 rounded-2 bg-grey-100" />
              <div className="h-16 w-3/4 rounded-2 bg-grey-100" />
              <div className="h-[56px] rounded-2 bg-grey-100 mt-12" />
              <div className="h-48 rounded-2 bg-grey-100" />
            </div>
            <div className="h-[50dvh] lg:h-[70dvh] rounded-2 bg-grey-100" />
          </div>
        </main>
      </>
    );
  }

  if (isError || !location) {
    return (
      <>
        <Header title="Vaskehal" back="/locationlist" />
        <main className="container-page py-48 pb-nav">
          <div role="alert" className="flex flex-col items-center text-center gap-12 max-w-md mx-auto">
            <span className="grid place-items-center w-64 h-64 rounded-full bg-danger-10-opacity text-danger-text">
              <Icon iconName="circleerror" />
            </span>
            <h2 className="text-md font-bold uppercase">Vi kunne ikke hente vaskehallen</h2>
            <p className="text-grey-200">Tjek din forbindelse og prøv igen.</p>
            <Button size="sm" type="secondary" buttonName="Prøv igen" onClick={() => refetch()} />
          </div>
        </main>
      </>
    );
  }

  const { insideClean, carWash, selfWash } = locationAvailability(location);
  const latitude = Number(location.location_latitude);
  const longitude = Number(location.location_longtitude);

  return (
    <>
      <Header title={location.location_city} back="/locationlist" />
      {/* Mobile: full-bleed map + bottom sheet. Desktop: details panel + map side by side */}
      <main className="relative overflow-hidden h-[calc(100dvh-var(--header-h))] lg:grid lg:grid-cols-[26rem_1fr]">
        <section
          id="location-sheet"
          aria-labelledby="location-title"
          style={sheetStyle}
          className="
            absolute z-10 inset-x-0 bottom-0 max-h-[85%] flex flex-col
            bg-surface rounded-t-12 border-t border-grey-100 shadow-[0_-8px_32px_-12px_rgb(26_26_24/0.25)]
            [transform:translateY(var(--sheet-y))]
            lg:static lg:max-h-none lg:rounded-none lg:border-t-0 lg:border-r-2 lg:border-grey-100 lg:shadow-none lg:[transform:none]
          "
        >
          {/* Handle: drag on touch, click/Enter to toggle */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="location-sheet-body"
            aria-label={isOpen ? "Skjul detaljer" : "Vis detaljer"}
            className="lg:hidden flex justify-center w-full pt-12 pb-8 touch-none"
            {...handleProps}
          >
            <span aria-hidden="true" className="h-[5px] w-48 rounded-full bg-grey-100" />
          </button>

          <div id="location-sheet-body" className="flex flex-col gap-24 overflow-y-auto [&>*]:shrink-0 px-16 sm:px-24 pb-nav lg:p-32">
            <div className="flex flex-col gap-8">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-800">Vaskehal</p>
              <h2 id="location-title" className="text-lg font-bold uppercase">
                {location.location_title}
              </h2>
              <p className="flex items-start gap-6 text-grey-200">
                <Icon iconName="location" size="sm" style="mt-2" />
                {location.location_address}
              </p>
            </div>

            <AvailabilityStrip insideClean={insideClean} carWash={carWash} className="rounded-2 overflow-hidden" />

            <dl className="divide-y divide-grey-100 border-y border-grey-100">
              <StatRow label="Vaskehaller" iconName="bubble" availability={carWash} />
              <StatRow label="Indre bilpleje" iconName="vacuum" availability={insideClean} />
              <StatRow label="Selvvask" iconName="carline" availability={selfWash} />
            </dl>

            <div className="flex flex-col gap-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-grey-200">Find vej</h3>
              <div className="grid grid-cols-2 gap-12">
                <Button
                  elementType="link"
                  external
                  linkHref={directionsUrl(location, "google")}
                  buttonName="Google Maps"
                  iconName="googlemaps"
                  iconFlexPos="order-first"
                  size="lg"
                  type="secondary"
                  className="text-sm! px-8 whitespace-nowrap"
                />
                <Button
                  elementType="link"
                  external
                  linkHref={directionsUrl(location, "apple")}
                  buttonName="Apple Kort"
                  iconName="applemaps"
                  iconFlexPos="order-first"
                  size="lg"
                  type="secondary"
                  className="text-sm! px-8 whitespace-nowrap"
                />
              </div>
            </div>

            <div className="flex flex-col gap-12 lg:mt-auto">
              <Button size="lg" buttonName="Vælg vaskehal" disabled={carWash.free === 0} />
              <Button type="tertiary" size="lg" buttonName="Selvvask" disabled={selfWash.free === 0} />
            </div>
          </div>
        </section>

        <div className="absolute inset-0 lg:static">
          <LocationMap latitude={latitude} longitude={longitude} label={location.location_title} />
        </div>
      </main>
    </>
  );
}
