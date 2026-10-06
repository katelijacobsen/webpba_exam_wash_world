import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/app/global/components/Logo";
import Icon from "@/app/global/components/Icon";
import Card from "./components/Card";

export const metadata: Metadata = { title: "Medlemskab" };

export default function Page() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b-2 border-grey-100 bg-surface">
        <div className="container-page flex items-center justify-between h-[var(--header-h)]">
          <Logo />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 min-h-48 font-bold uppercase text-sm text-primary-800 hover:underline underline-offset-4"
          >
            <Icon iconName="back" size="sm" /> Tilbage
          </Link>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="container-page flex-1 py-40 lg:py-64 outline-none">
        <div className="grid gap-40 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-16 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary-800">Medlemskab</p>
            <h1 className="text-2xl font-extrabold uppercase leading-[0.95]">
              En ren bil,<br />hver gang du vil
            </h1>
            <p className="text-grey-200 text-md max-w-[40ch]">
              Ét fast beløb om måneden. Kør ind, vask, og kør videre — nummerpladen klarer resten.
            </p>
          </div>
          <div className="w-full max-w-md lg:justify-self-end">
            <Card />
          </div>
        </div>
      </main>
    </div>
  );
}
