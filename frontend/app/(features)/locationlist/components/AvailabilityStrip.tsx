import Icon from "@/app/global/components/Icon";
import type { Availability, AvailabilityStatus } from "../utils/location";

const tone: Record<AvailabilityStatus, string> = {
  success: "bg-success-10-opacity text-success-text",
  warning: "bg-warning-10-opacity text-warning-text",
  danger: "bg-danger-10-opacity text-danger-text",
  none: "bg-grey-50 text-grey-200",
};

type Segment = {
  label: string;
  iconName: string;
  availability: Availability;
};

type Props = {
  insideClean: Availability;
  carWash: Availability;
  className?: string;
};

function describe({ label, availability }: Segment) {
  if (availability.status === "none") return `${label}: findes ikke her`;
  return `${label}: ${availability.free} af ${availability.max} ledige`;
}

// Figma "60-grader" header: two tinted halves split by a 60° diagonal
export default function AvailabilityStrip({ insideClean, carWash, className = "" }: Props) {
  const segments: Segment[] = [
    { label: "Indre bilpleje", iconName: "vacuum", availability: insideClean },
    { label: "Vaskehaller", iconName: "bubble", availability: carWash },
  ];

  return (
    <div className={`flex ${className}`}>
      {segments.map((segment, i) => {
        const { free, max, status } = segment.availability;
        return (
          <div
            key={segment.label}
            className={`flex-1 flex flex-col items-center justify-center gap-4 py-10 ${tone[status]} ${
              i === 0
                ? "pr-12 [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)]"
                : "-ml-10 pl-12 [clip-path:polygon(14px_0,100%_0,100%_100%,0_100%)]"
            }`}
          >
            <span className="sr-only">{describe(segment)}</span>
            <span aria-hidden="true" className="flex items-center gap-4 font-bold text-sm leading-none">
              <Icon iconName={segment.iconName} size="xs" />
              {status === "none" ? "–" : `${free}/${max}`}
            </span>
            <span aria-hidden="true" className="uppercase font-bold text-[11px] leading-none tracking-[0.04em]">
              {segment.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
