"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import Logo from "./Logo";
import type { IconNameType } from "./IconMap";

type MenuItem = {
  href: string;
  label: string;
  iconName: IconNameType;
};

const items: MenuItem[] = [
  { href: "/dashboard",    label: "Hjem",    iconName: "home" },
  { href: "/mycar",        label: "Min bil", iconName: "car" },
  { href: "/locationlist", label: "Bilvask", iconName: "location" },
  { href: "/profile",      label: "Profil",  iconName: "user" },
];

// Mobile/tablet: floating bottom bar (Figma "nav").
// Desktop (lg+): fixed dark sidebar — same links, same DOM, so focus order stays identical.
const Menu = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Hovedmenu"
      className="
        fixed z-30 inset-x-12 bottom-[calc(12px+env(safe-area-inset-bottom))]
        rounded-8 border border-grey-100 bg-surface-2/95 backdrop-blur-md shadow-raised
        sm:inset-x-auto sm:left-1/2 sm:w-[32rem] sm:-translate-x-1/2
        lg:translate-x-0 lg:inset-y-0 lg:left-0 lg:bottom-0 lg:w-[var(--sidebar-w)]
        lg:rounded-none lg:border-0 lg:bg-bg-dark lg:shadow-none lg:backdrop-blur-none
        lg:flex lg:flex-col lg:gap-40 lg:px-16 lg:py-24
      "
    >
      <div className="hidden lg:block px-8">
        <Logo tone="light" />
      </div>

      <ul className="grid grid-cols-4 p-8 lg:p-0 lg:flex lg:flex-col lg:gap-4">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="flex">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group flex-1 flex flex-col items-center justify-center gap-6 min-h-48 py-4 rounded-4
                  text-xs font-bold uppercase tracking-[0.03em]
                  lg:flex-row lg:justify-start lg:gap-12 lg:px-8 lg:py-8 lg:text-sm
                  ${isActive
                    ? "text-primary-900 lg:text-white lg:bg-white/10"
                    : "text-grey-200 hover:text-primary-800 lg:text-white/70 lg:hover:text-white lg:hover:bg-white/5"}
                `}
              >
                <span
                  className={`grid place-items-center w-40 h-40 rounded-2 ${
                    isActive
                      ? "bg-primary-400 text-bg-dark bevel"
                      : "text-primary-800 group-hover:bg-primary-50 lg:text-primary-400 lg:group-hover:bg-white/10"
                  }`}
                >
                  <Icon iconName={item.iconName} />
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/membership-signup"
        className="hidden lg:flex mt-auto flex-col gap-6 rounded-4 border border-white/10 bg-white/5 p-16 text-white hover:bg-white/10"
      >
        <span className="text-xs uppercase tracking-[0.06em] text-white/70">Medlemskab</span>
        <span className="font-bold">Vask så tit du vil</span>
        <span className="inline-flex items-center gap-4 text-sm font-bold text-primary-400">
          Se fordele <Icon iconName="next" size="xs" />
        </span>
      </Link>
    </nav>
  );
};

export default Menu;
