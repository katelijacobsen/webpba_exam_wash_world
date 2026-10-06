import type { ReactNode } from "react";
import Logo from "@/app/global/components/Logo";
import Icon from "@/app/global/components/Icon";

const perks = [
  "Find ledige vaskehaller i realtid",
  "Styr alle dine biler ét sted",
  "Vask så tit du vil med medlemskab",
];

// Split screen on desktop (brand panel + form), stacked on mobile
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="relative isolate overflow-hidden bg-bg-dark text-white px-24 pt-24 pb-64 sm:px-40 lg:p-48 lg:flex lg:flex-col lg:justify-between">
        <span
          aria-hidden="true"
          className="absolute -right-48 -bottom-80 -z-10 text-[22rem] lg:text-[40rem] leading-none font-extrabold text-white/[0.05] select-none"
        >
          W
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-primary-400/10 [clip-path:polygon(60%_0,100%_0,100%_100%,0_100%)]"
        />

        <Logo href="/" tone="light" />

        <div className="mt-40 lg:mt-0 flex flex-col gap-16 max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary-400">Bilvask på dine præmisser</p>
          <p className="text-xl lg:text-2xl font-extrabold uppercase leading-[0.95]">
            Ren bil.<br />Ingen kø.
          </p>
          <ul className="hidden lg:flex flex-col gap-12 mt-16">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-12 text-white/85">
                <span className="grid place-items-center w-24 h-24 rounded-full bg-primary-400 text-bg-dark shrink-0">
                  <Icon iconName="check" size="xs" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="hidden lg:block text-sm text-white/50">© Wash World</p>
      </aside>

      <main
        id="main-content"
        tabIndex={-1}
        className="relative -mt-40 lg:mt-0 px-16 pb-48 sm:px-24 lg:px-48 lg:py-64 flex justify-center lg:items-center outline-none"
      >
        <div className="w-full max-w-[30rem] animate-rise">{children}</div>
      </main>
    </div>
  );
}
