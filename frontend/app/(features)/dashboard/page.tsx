import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import Header from "@/app/global/components/Header";
import Icon from "@/app/global/components/Icon";
import { getEventLocations } from "@/app/lib/api";
import Greeting from "./components/Greeting";
import PromoCard from "./components/PromoCard";
import Co2Card from "./components/Co2Card";
import QuickActions from "./components/QuickActions";
import Card from "../locationlist/components/Card";
import { Location } from "../locationlist/hooks/useFilterLocations";

export const metadata: Metadata = { title: "Hjem" };

export default async function DashboardPage() {
  // Prerendering stopper her — dashboardet renderes ved hvert request,
  // så build kan køre uden at backend er oppe
  await connection();

  let locations: Awaited<ReturnType<typeof getEventLocations>> = [];
  try {
    locations = await getEventLocations();
  } catch {
    locations = [];
  }

  const fallback: Location[] = [
    {
      location_pk: "fallback-1",
      location_title: "Herlev",
      location_city: "Herlev",
      location_address: "",
      location_region: "Sjælland",
      location_latitude: "55.723",
      location_longtitude: "12.439",
      location_carwash_max: "00",
      location_carwash_in_use: "00",
      location_selfwash_max: "00",
      location_selfwash_in_use: "00",
      location_insideclean_max: "00",
      location_insideclean_in_use: "00",
    },
  ];

  const list = locations.length > 0 ? locations.slice(0, 2) : fallback;

  return (
    <>
      <Header title="Hjem" />
      <main className="container-page pt-24 pb-nav grid gap-24 lg:gap-32 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Greeting />
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <PromoCard />
        </div>

        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-12">
          <Co2Card kg={23.5} />
          <QuickActions />
        </div>

        <section aria-labelledby="locations-heading" className="lg:col-span-12 flex flex-col gap-16">
          <div className="flex items-end justify-between gap-16">
            <h2 id="locations-heading" className="text-md font-bold uppercase">
              Vaskehaller
            </h2>
            <Link
              href="/locationlist"
              className="inline-flex items-center gap-4 min-h-48 font-bold uppercase text-sm text-primary-800 underline decoration-2 decoration-primary-400 underline-offset-[6px] hover:decoration-primary-800"
            >
              Se alle <Icon iconName="next" size="xs" />
            </Link>
          </div>
          <ul className="grid gap-16 md:grid-cols-2">
            {list.map((location) => (
              <li key={location.location_pk}>
                <Card location={location} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
