"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import type { IconNameType } from "./IconMap";

type MenuItem = {
  href: string;
  label: string;
  iconName: IconNameType;
};

const items: MenuItem[] = [
  { href: "/dashboard",    label: "Hjem",   iconName: "home" },
  { href: "/mycar",        label: "Min Bil", iconName: "car" },
  { href: "/locationlist", label: "Bilvask", iconName: "location" },
  { href: "/profile",      label: "Profil",  iconName: "user" },
  { href: "/",             label: "Info",    iconName: "circleinfo" },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Hovedmenu" className="fullbleed sticky bottom-0 z-10 py-16">
      <ul className="bg-surface flex justify-around items-center py-12 rounded-6 border border-grey-100">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-4 text-xs uppercase font-bold text-text"
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`flex items-center justify-center w-[44px] h-[44px] rounded-8 ${
                    isActive
                      ? "bg-primary-400 text-bg-dark ring-2 ring-primary-600 ring-offset-1"
                      : "bg-success-100 text-primary-800 hover:bg-primary-100"
                  }`}
                >
                  <Icon iconName={item.iconName} />
                </span>
                <span
                  className={`${isActive ? "text-primary-800 font-bold underline underline-offset-2" : "text-grey-400"}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
