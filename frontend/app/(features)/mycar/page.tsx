"use client";

import Header from "@/app/global/components/Header";
import CarCard from "./components/CarCard";
import Snackbar from "@/app/global/components/Snackbar";
import Button from "@/app/global/components/Button";
import Icon from "@/app/global/components/Icon";
import { useEffect, useState } from "react";
import FormDialog from "./components/FormDialog";
import { useCars } from "./hooks/useCars";
import { carImgSrc } from "@/app/lib/images";
import { useRestoreCar } from "./hooks/useRestoreCar";

export default function Mycar() {
  const [added, setAdded] = useState<number | null>(null);
  const { data: cars, isPending, isError, refetch } = useCars();
  const [deleted, setDeleted] = useState<number | null >(null);
  const [restore, setRestore] = useState<string | null > (null);
  const restoreMutation = useRestoreCar();

  useEffect(() => {
    const pk = sessionStorage.getItem("carDeleted")
    if(pk){
      setRestore(pk)
      setDeleted(Date.now())
    }
    sessionStorage.removeItem("carDeleted");
  }, [])

  const count = cars?.length ?? 0;

  return (
    <>
      <Header
        title="Min bil"
        back="/dashboard"
        action={
          count > 0 ? (
            <Button
              elementType="button"
              buttonName="Tilføj"
              iconName="plus"
              iconFlexPos="order-first"
              size="sm"
              type="secondary"
              dialogId="add-car-dialog"
              className="max-sm:px-12 max-sm:[&>span:first-child]:sr-only"
            />
          ) : null
        }
      />
      <main className="container-page pt-24 pb-nav flex flex-col gap-24">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold uppercase">Mine biler</h2>
          <p className="text-grey-200" aria-live="polite">
            {isPending
              ? "Henter dine biler…"
              : count === 0
                ? "Du har ikke tilføjet nogen biler endnu."
                : count === 1
                  ? "1 bil tilknyttet dit medlemskab"
                  : `${count} biler tilknyttet dit medlemskab`}
          </p>
        </div>

        {isError ? (
          <div role="alert" className="flex flex-col items-start gap-12 p-24 rounded-4 bg-danger-10-opacity">
            <p className="flex items-center gap-8 font-bold text-danger-text">
              <Icon iconName="circleerror" /> Vi kunne ikke hente dine biler
            </p>
            <Button size="sm" type="secondary" buttonName="Prøv igen" onClick={() => refetch()} />
          </div>
        ) : (
          <ul className="grid gap-16 sm:grid-cols-2 xl:grid-cols-3">
            {isPending &&
              [0, 1].map((i) => (
                <li key={i} aria-hidden="true" className="animate-pulse rounded-4 border border-grey-100 bg-surface-2 overflow-hidden">
                  <div className="aspect-image bg-grey-100" />
                  <div className="p-16 grid gap-8">
                    <div className="h-16 w-1/3 rounded-2 bg-grey-100" />
                    <div className="h-12 w-1/2 rounded-2 bg-grey-100" />
                  </div>
                </li>
              ))}
            {cars?.map((car) => (
              <li key={car.car_pk} className="animate-rise">
                <CarCard
                  variant="filled"
                  licensePlate={car.car_licenseplate}
                  imageUrl={carImgSrc(car.car_image)}
                  lastWash={car.car_most_recent_wash}
                  href={`/mycar/${encodeURIComponent(car.car_licenseplate)}`}
                />
              </li>
            ))}
            {!isPending && (
              <li>
                <CarCard variant="empty" dialogId="add-car-dialog" hasCars={count > 0} />
              </li>
            )}
          </ul>
        )}

        <FormDialog
          id="add-car-dialog"
          onSuccess={() => setAdded(Date.now())}
        />
      </main>
      {added && (
        <Snackbar key={added} message="Bilen er tilføjet" />
      )}
      {deleted && restore && (
        <Snackbar
          key={deleted}
          message="Bilen er fjernet"
          onUndo={() => { restoreMutation.mutate(restore); setRestore(null) }}
        />
      )}
    </>
  );
}
