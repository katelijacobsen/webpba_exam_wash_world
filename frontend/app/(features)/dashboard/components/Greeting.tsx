"use client";

import { useSession } from "@/app/(features)/profile/hooks/useSession";

function greetingFor(hour: number) {
  if (hour < 5) return "God nat";
  if (hour < 10) return "God morgen";
  if (hour < 12) return "God formiddag";
  if (hour < 18) return "God eftermiddag";
  return "God aften";
}

export default function Greeting() {
  const sessionQuery = useSession();
  const firstName = sessionQuery.data?.user_fullname?.split(" ")[0] ?? "der";
  // Only rendered after the session loads on the client, so the clock is safe to read here
  const now = new Date();
  const today = now.toLocaleDateString("da-DK", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="flex flex-col gap-8">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-800">{today}</p>
      <h2 className="text-xl font-extrabold">
        {greetingFor(now.getHours())}, {firstName}
      </h2>
    </div>
  );
}
