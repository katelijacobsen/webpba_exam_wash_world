import Link from "next/link";
import Icon from "@/app/global/components/Icon";

export default function PromoCard() {
  return (
    <article className="relative isolate overflow-hidden rounded-4 bg-bg-dark text-white p-24 sm:p-32 h-full flex flex-col justify-between gap-32 min-h-[13rem]">
      {/* Brand watermark + angled green accent (Figma 60° shape) */}
      <span
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 text-[13rem] sm:text-[16rem] leading-none font-extrabold text-white/[0.06] select-none"
      >
        W
      </span>
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 -z-10 h-full w-1/3 bg-primary-400/15 [clip-path:polygon(58%_0,100%_0,100%_100%,0_100%)]"
      />

      <div className="flex flex-col gap-12">
        <p className="inline-flex w-fit items-center gap-6 rounded-2 bg-primary-400 text-bg-dark px-8 py-4 text-xs font-bold uppercase tracking-[0.06em]">
          <Icon iconName="crown" size="xs" /> Medlemskab
        </p>
        <h2 className="text-lg font-bold uppercase max-w-[18ch]">
          Mangler du en vask der passer til dig?
        </h2>
      </div>

      <Link
        href="/membership-signup"
        className="group inline-flex w-fit items-center gap-8 min-h-48 font-bold uppercase text-primary-400 hover:text-white"
      >
        Bliv medlem i dag
        <Icon iconName="next" size="sm" style="transition-transform group-hover:translate-x-4" />
      </Link>
    </article>
  );
}
