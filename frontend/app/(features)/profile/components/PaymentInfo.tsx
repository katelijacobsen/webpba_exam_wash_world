"use client";

import { useState } from "react";
import Icon from "@/app/global/components/Icon";

type Card = { id: string; label: string; brand?: string; expires?: string };

const cards: Card[] = [
  { id: "card1", label: "•••• 1234", brand: "Visa", expires: "08/27" },
  { id: "card2", label: "•••• 5678", brand: "Mastercard", expires: "02/28" },
  { id: "new", label: "Tilføj nyt betalingskort" },
];

export default function PaymentInfo() {
  const [selected, setSelected] = useState<string>("card1");

  return (
    <section aria-labelledby="payment-heading" className="rounded-4 border border-grey-100 bg-surface-2 p-20 sm:p-24">
      <fieldset className="flex flex-col gap-16 border-0 p-0 m-0">
        <legend id="payment-heading" className="text-md font-bold uppercase mb-16">
          Mine betalingskort
        </legend>
        <div className="grid gap-12 sm:grid-cols-2">
          {cards.map((card) => {
            const isSelected = selected === card.id;
            const isNew = card.id === "new";
            return (
              <label
                key={card.id}
                className={`relative flex items-center gap-12 min-h-[4.5rem] px-16 py-12 rounded-4 border-2 cursor-pointer
                  has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-primary-600 has-[:focus-visible]:outline-offset-2
                  ${isNew ? "border-dashed sm:col-span-2" : ""}
                  ${isSelected ? "border-primary-400 bg-primary-50" : "border-grey-100 bg-white hover:border-primary-200"}`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value={card.id}
                  checked={isSelected}
                  onChange={() => setSelected(card.id)}
                  className="peer appearance-none w-24 h-24 rounded-full border-2 border-grey-200 bg-white checked:border-primary-600 checked:bg-primary-600 checked:shadow-[inset_0_0_0_4px_white] shrink-0 focus-visible:outline-none"
                />
                <span className={`grid place-items-center w-48 h-32 rounded-2 shrink-0 ${isNew ? "bg-primary-50 text-primary-800" : "bg-bg-dark text-white"}`}>
                  <Icon iconName={isNew ? "plus" : "bill"} size="sm" />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="font-bold">{card.label}</span>
                  {card.brand && (
                    <span className="text-sm text-grey-200">
                      {card.brand} · udløber {card.expires}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
