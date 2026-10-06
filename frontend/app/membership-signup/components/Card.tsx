import Link from "next/link";
import Icon from "@/app/global/components/Icon";

// Placeholder benefits — replace with the real plan content
const benefits = [
  "Vask så tit du vil",
  "Adgang til alle vaskehaller",
  "Indre bilpleje inkluderet",
  "Ingen binding — opsig når du vil",
];

export default function Card() {
  return (
    <article
      itemScope
      itemType="https://schema.org/Product"
      className="relative isolate overflow-hidden rounded-4 bg-bg-dark text-white shadow-raised"
    >
      <span
        aria-hidden="true"
        className="absolute -right-24 -top-40 -z-10 text-[14rem] leading-none font-extrabold text-white/[0.05] select-none"
      >
        W
      </span>

      <div className="flex flex-col gap-24 p-24 sm:p-32">
        <div className="flex items-start justify-between gap-16">
          <div className="flex flex-col gap-8">
            <p className="inline-flex w-fit items-center gap-6 rounded-2 bg-primary-400 text-bg-dark px-8 py-4 text-xs font-bold uppercase tracking-[0.06em]">
              <Icon iconName="crown" size="xs" /> Mest populær
            </p>
            <h2 itemProp="name" className="text-lg font-bold uppercase">Medlemskab</h2>
          </div>
        </div>

        <p
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
          className="flex items-baseline gap-8"
        >
          <span className="text-2xl font-extrabold leading-none">
            <span itemProp="price" content="199">199</span>
          </span>
          <span className="font-bold uppercase text-white/70">
            <data itemProp="priceCurrency" value="DKK">kr.</data> / md.
          </span>
        </p>

        <details className="dropdown group border-y border-white/10">
          <summary className="flex items-center justify-between gap-8 min-h-48 cursor-pointer list-none font-bold uppercase text-primary-400 [&::-webkit-details-marker]:hidden">
            Se fordele
            <Icon iconName="dropdown" style="transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <ul className="flex flex-col gap-12 pb-16">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-12 text-white/85">
                <span className="grid place-items-center w-24 h-24 rounded-full bg-primary-400 text-bg-dark shrink-0">
                  <Icon iconName="check" size="xs" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </details>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-8 w-full min-h-48 px-16 rounded-2 bg-primary-400 text-bg-dark font-bold uppercase bevel hover:bg-[#05ad5c]"
        >
          Kom i gang <Icon iconName="next" size="sm" />
        </Link>
      </div>
    </article>
  );
}
