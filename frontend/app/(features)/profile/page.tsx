"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/global/components/Header";
import Button from "@/app/global/components/Button";
import Dialog from "@/app/global/components/Dialog";
import PersonalOverview from "./components/PersonalOverview";
import PersonalInfo from "./components/PersonalInfo";
import PaymentInfo from "./components/PaymentInfo";
// custom hook
import { useDeleteUser } from "./hooks/useDeleteUser";
import { useSession } from "./hooks/useSession";

export default function ProfilePage() {
  const router = useRouter();

  const sessionQuery = useSession();
  const deleteMutation = useDeleteUser();

  // Bruges efter man har slettet profilen
  useEffect(() => {
    if (deleteMutation.isSuccess) router.push("/");
  }, [deleteMutation.isSuccess, router]);

  if (!sessionQuery.data) return null;
  const user = sessionQuery.data;

  return (
    <>
      <Header title="Min profil" back="/dashboard" />
      <main className="container-page pt-24 pb-nav grid gap-16 lg:gap-24 lg:grid-cols-[20rem_1fr] lg:items-start">
        {/* Personlige overblik & medlemskab */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <PersonalOverview user={user} />
        </div>

        <div className="flex flex-col gap-16 lg:gap-24 min-w-0">
          {/* Personlige information */}
          <PersonalInfo user={user} />
          {/* Betalingsmuligheder */}
          <PaymentInfo />

          {/* Slet profil */}
          <section aria-labelledby="danger-heading" className="rounded-4 border-2 border-danger/25 bg-danger-10-opacity/40 p-20 sm:p-24 flex flex-col gap-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4">
              <h2 id="danger-heading" className="font-bold uppercase text-danger-text">Slet profil</h2>
              <p className="text-sm text-grey-200 max-w-[48ch]">
                Din profil, dine biler og dit medlemskab bliver slettet permanent.
              </p>
            </div>
            <Button
              elementType="button"
              buttonName="Slet profil"
              size="sm"
              type="secondary"
              status="danger"
              dialogId="delete-profile-dialog"
              className="max-sm:w-full"
            />
          </section>
        </div>

        {/* Popup/Dialog */}
        <Dialog
          id="delete-profile-dialog"
          title="Slet din profil?"
          description="Det kan ikke fortrydes. Alle dine oplysninger og biler bliver fjernet."
          buttonTwo={{
            elementType: "button",
            buttonName: "Annullér",
            size: "lg",
            type: "secondary",
            status: "normal",
          }}
          buttonThree={{
            elementType: "button",
            buttonName: deleteMutation.isPending ? "Sletter…" : "Slet",
            size: "lg",
            type: "primary",
            status: "danger",
            onClick: () => deleteMutation.mutate(),
          }}
        />
      </main>
    </>
  );
}
