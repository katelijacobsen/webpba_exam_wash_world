"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  title: string;
  intro?: string;
  children: ReactNode;
  footer?: ReactNode;
  // Move focus to the heading when the view switches (login ⇄ signup ⇄ forgot)
  autoFocusHeading?: boolean;
};

export default function AuthCard({ title, intro, children, footer, autoFocusHeading }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (autoFocusHeading) heading.current?.focus();
  }, [autoFocusHeading]);

  return (
    <div className="flex flex-col gap-24 rounded-4 bg-surface-2 border border-grey-100 shadow-raised p-24 sm:p-32">
      <div className="flex flex-col gap-8">
        <h1 ref={heading} tabIndex={-1} className="text-lg font-bold uppercase outline-none">
          {title}
        </h1>
        {intro && <p className="text-grey-200">{intro}</p>}
      </div>
      {children}
      {footer && <div className="pt-16 border-t border-grey-100 flex flex-col items-center gap-4 text-center">{footer}</div>}
    </div>
  );
}
