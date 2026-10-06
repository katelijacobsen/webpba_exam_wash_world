"use client";

import Link from "next/link";
import Icon from "@/app/global/components/Icon";
import LicensePlate from "./LicensePlate";
import CarPhoto from "./CarPhoto";
import { formatWashDate } from "../utils/format";

interface CarCardEmptyProps {
  variant: "empty";
  dialogId?: string;
  onAdd?: () => void;
  hasCars?: boolean;
}

interface CarCardFilledProps {
  variant: "filled";
  licensePlate: string;
  imageUrl: string | null;
  href: string;
  lastWash?: number;
}

type CarCardProps = CarCardEmptyProps | CarCardFilledProps;

const CarCard = (props: CarCardProps) => {
  if (props.variant === "empty") {
    return (
      <button
        type="button"
        onClick={() => {
          if (props.dialogId) {
            (document.getElementById(props.dialogId) as HTMLDialogElement | null)?.showModal();
          }
          props.onAdd?.();
        }}
        className="group w-full h-full min-h-[14rem] flex flex-col items-center justify-center gap-16 p-24 rounded-4 border-2 border-dashed border-primary-200 bg-primary-50/50 text-primary-800 hover:bg-primary-50 hover:border-primary-400"
      >
        <span className="grid place-items-center w-64 h-64 rounded-full bg-primary-400 text-bg-dark bevel transition-transform group-hover:scale-105">
          <Icon iconName="plus" />
        </span>
        <span className="flex flex-col items-center gap-4 text-center">
          <span className="font-bold uppercase text-md">Tilføj bil</span>
          <span className="text-sm text-grey-200">
            {props.hasCars ? "Har du flere biler? Tilføj dem her" : "Tilføj din første bil for at komme i gang"}
          </span>
        </span>
      </button>
    );
  }

  return (
    <article className="group relative h-full flex flex-col rounded-4 overflow-hidden bg-surface-2 border border-grey-100 hover:border-primary-100 hover:shadow-card">
      <div className="relative">
        <CarPhoto src={props.imageUrl} className="transition-transform duration-300 group-hover:scale-[1.03]" />
        <LicensePlate plate={props.licensePlate} className="absolute left-12 bottom-12" />
      </div>
      <div className="flex items-center justify-between gap-12 p-16">
        <div className="flex flex-col gap-4 min-w-0">
          <h2 className="font-bold uppercase truncate">
            {/* Whole card is clickable via the stretched link */}
            <Link href={props.href} className="after:absolute after:inset-0 focus-visible:outline-none group-has-[a:focus-visible]:underline">
              {props.licensePlate}
            </Link>
          </h2>
          <p className="text-sm text-grey-200">Seneste vask: {formatWashDate(props.lastWash)}</p>
        </div>
        <span className="grid place-items-center w-40 h-40 rounded-full bg-primary-50 text-primary-800 shrink-0 group-hover:bg-primary-400 group-hover:text-bg-dark">
          <Icon iconName="next" size="sm" />
        </span>
      </div>
      {/* Focus ring for the stretched link, drawn on the card */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-4 group-has-[a:focus-visible]:outline-3 group-has-[a:focus-visible]:outline-primary-600 group-has-[a:focus-visible]:outline-offset-2" />
    </article>
  );
};

export default CarCard;
