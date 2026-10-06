"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "@/app/global/types/global";
import Form from "./Form";
import Snackbar from "@/app/global/components/Snackbar";
import Button from "@/app/global/components/Button";
import Icon from "@/app/global/components/Icon";
import { useUpdateUser } from "../hooks/useUpdateUser";

type Props = { user: User };

const fields: { key: keyof User; label: string; iconName: string }[] = [
  { key: "user_fullname", label: "Navn", iconName: "user" },
  { key: "user_email", label: "Email", iconName: "send" },
  { key: "user_phonenumber", label: "Telefonnummer", iconName: "support" },
  { key: "user_address", label: "Adresse", iconName: "location" },
];

export default function PersonalInfo({ user }: Props) {
  const [Edit, setEdit] = useState(false);
  const [saved, setSaved] = useState<number | null>(null);
  // Snapshot af de GAMLE værdier (taget når formularen åbnes) — bruges til "Fortryd"
  const [prevValues, setPrevValues] = useState<User | null>(null);
  const undoMutation = useUpdateUser();
  const editButton = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(false);

  // Return focus to the edit button after closing the form (keyboard users stay in place)
  function closeForm() {
    returnFocus.current = true;
    setEdit(false);
  }

  useEffect(() => {
    if (!Edit && returnFocus.current) {
      returnFocus.current = false;
      editButton.current?.querySelector("button")?.focus();
    }
  }, [Edit]);

  return (
    <section aria-labelledby="info-heading" className="rounded-4 border border-grey-100 bg-surface-2 p-20 sm:p-24 flex flex-col gap-20">
      <div className="flex items-center justify-between gap-12">
        <h2 id="info-heading" className="text-md font-bold uppercase">Mine oplysninger</h2>
        {!Edit && (
          <div ref={editButton}>
            <Button
              typeAction="button"
              elementType="button"
              buttonName="Redigér"
              iconName="pencil"
              iconFlexPos="order-first"
              size="sm"
              type="secondary"
              onClick={() => {
                setPrevValues(user); // gem de nuværende (gamle) værdier FØR man ændrer
                setEdit(true);
              }}
            />
          </div>
        )}
      </div>

      {Edit ? (
        <Form
          user={user}
          onSave={() => {
            closeForm();
            setSaved(Date.now());
          }}
          onCancel={closeForm}
        />
      ) : (
        <dl className="grid gap-0 sm:grid-cols-2 sm:gap-x-24">
          {fields.map((field) => (
            <div key={field.key} className="flex items-start gap-12 py-12 border-b border-grey-100 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
              <span className="grid place-items-center w-40 h-40 rounded-2 bg-primary-50 text-primary-800 shrink-0">
                <Icon iconName={field.iconName} size="sm" />
              </span>
              <div className="flex flex-col gap-2 min-w-0">
                <dt className="text-xs font-bold uppercase tracking-[0.06em] text-grey-200">{field.label}</dt>
                <dd className="font-medium break-words">{String(user[field.key] ?? "") || "—"}</dd>
              </div>
            </div>
          ))}
        </dl>
      )}

      {saved && prevValues && (
        <Snackbar
          key={saved}
          message="Profil opdateret"
          onUndo={() => {
            // send de GAMLE værdier tilbage = fortryd ændringen
            undoMutation.mutate({
              user_fullname: prevValues.user_fullname,
              user_email: prevValues.user_email,
              user_phonenumber: prevValues.user_phonenumber,
              user_address: prevValues.user_address,
            });
            setSaved(null); // skjul snackbaren
          }}
        />
      )}
    </section>
  );
}
