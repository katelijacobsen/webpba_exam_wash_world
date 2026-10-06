"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Icon from "./Icon";

interface HeaderProps {
  title: string;
  // true = browser back, string = fixed fallback route (used when there is no history)
  back?: boolean | string;
  action?: ReactNode;
}

const Header = ({ title, back, action }: HeaderProps) => {
  const router = useRouter();
  const fallback = typeof back === "string" ? back : "/dashboard";

  return (
    <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md border-b-2 border-grey-100 supports-[not(backdrop-filter:blur(0))]:bg-surface">
      <div className="container-page grid grid-cols-[48px_1fr_48px] items-center h-[var(--header-h)] lg:grid-cols-[auto_1fr_auto] lg:gap-16">
        <div className="flex items-center">
          {back && (
            <Link
              href={fallback}
              onClick={(e) => {
                // Prefer real history so scroll position and filters survive
                if (window.history.length > 1) {
                  e.preventDefault();
                  router.back();
                }
              }}
              aria-label="Tilbage"
              className="inline-flex items-center justify-center w-48 h-48 -ml-12 rounded-full text-primary-800 hover:bg-primary-50"
            >
              <Icon iconName="back" />
            </Link>
          )}
        </div>

        <h1 className="text-center lg:text-left text-md lg:text-lg font-bold uppercase tracking-[0.01em] truncate">
          {title}
        </h1>

        <div className="flex items-center justify-end">{action}</div>
      </div>
    </header>
  );
};

export default Header;
