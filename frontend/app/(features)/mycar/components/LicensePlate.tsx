type Props = {
  plate: string;
  size?: "sm" | "lg";
  className?: string;
};

// Danish-style plate: white field, red rim, blue EU band with "DK"
export default function LicensePlate({ plate, size = "sm", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-stretch overflow-hidden rounded-4 border-2 border-[#c8102e] bg-white text-bg-dark shadow-card ${
        size === "lg" ? "h-48" : "h-32"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex flex-col items-center justify-end bg-[#003399] text-white font-bold leading-none ${
          size === "lg" ? "w-24 pb-4 text-[11px]" : "w-16 pb-2 text-[8px]"
        }`}
      >
        DK
      </span>
      <span
        className={`flex items-center font-extrabold uppercase tracking-[0.08em] whitespace-nowrap ${
          size === "lg" ? "px-12 text-lg" : "px-8 text-sm"
        }`}
      >
        <span className="sr-only">Nummerplade </span>
        {plate}
      </span>
    </span>
  );
}
