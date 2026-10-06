import type { Metadata } from "next";
import { connection } from "next/server";
import Header from "@/app/global/components/Header";
import LocationSearch from "./components/LocationSearch";
import { getEventLocations } from "@/app/lib/api";

export const metadata: Metadata = { title: "Find vaskehal" };

export default async function Home() {
  // Prerendering stopper her — listen hentes ved hvert request
  await connection();
  const locations = await getEventLocations();

  return (
    <>
      <Header title="Vaskehal oversigt" back="/dashboard" />
      <main className="container-page pt-8 pb-nav">
        <LocationSearch locations={locations} />
      </main>
    </>
  );
}
