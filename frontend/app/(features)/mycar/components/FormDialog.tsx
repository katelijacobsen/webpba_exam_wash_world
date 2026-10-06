"use client";

import Icon from "@/app/global/components/Icon";
import { dialogClass } from "@/app/global/components/Dialog";
import { CarDialog } from "../types/types";
import CarForm from "./CarForm";

export default function FormDialog({ id, onSuccess }: CarDialog) {
  const titleId = `${id}-title`;

  function close() {
    (document.getElementById(id) as HTMLDialogElement | null)?.close();
  }

  return (
    <dialog id={id} aria-labelledby={titleId} className={dialogClass}>
      <div className="relative p-24 sm:p-32">
        <button
          type="button"
          onClick={close}
          aria-label="Luk dialog"
          className="absolute top-12 right-12 grid place-items-center w-48 h-48 rounded-full text-grey-200 hover:text-text hover:bg-grey-100"
        >
          <Icon iconName="close" />
        </button>
        <CarForm titleId={titleId} onSuccess={() => { close(); onSuccess?.(); }} onCancel={close} />
      </div>
    </dialog>
  );
}
