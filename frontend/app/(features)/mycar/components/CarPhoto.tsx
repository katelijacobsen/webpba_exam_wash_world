"use client";

import { useState } from "react";
import Icon from "@/app/global/components/Icon";

type Props = {
  src: string | null;
  alt?: string;
  className?: string;
};

// Car image with a branded placeholder when there's no image (or it fails to load)
export default function CarPhoto({ src, alt = "", className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full aspect-image overflow-hidden bg-grey-50">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- images come from the Flask backend
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover ${className}`}
        />
      ) : (
        <div className="w-full h-full grid place-items-center bg-[linear-gradient(135deg,var(--color-primary-50),var(--color-grey-50))] text-primary-200">
          <Icon iconName="car" style="w-64 h-64" />
          {alt && <span className="sr-only">{alt} — intet billede</span>}
        </div>
      )}
    </div>
  );
}
