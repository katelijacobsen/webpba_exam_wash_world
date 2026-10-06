"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/global/components/Header";
import Button from "@/app/global/components/Button";
import Dialog from "@/app/global/components/Dialog";
import Icon from "@/app/global/components/Icon";
import { useCars } from "@/app/(features)/mycar/hooks/useCars";
import { carImgSrc } from "@/app/lib/images";
import { useDeleteCar } from "../hooks/useDeleteCar";
import CarPhoto from "../components/CarPhoto";
import LicensePlate from "../components/LicensePlate";
import { formatWashDate } from "../utils/format";

export default function SingleCarPage() {
  const { car_licenseplate } = useParams<{ car_licenseplate: string }>();
  // URL-params kommer percent-encoded ("AB%20123456") — decode før sammenligning
  const plate = decodeURIComponent(car_licenseplate);
  const router = useRouter();
  const { data: cars, isPending } = useCars();
  const car = cars?.find((c) => c.car_licenseplate === plate); // find bilen i cachen
  const deleteMutation = useDeleteCar();

  useEffect(() => {
    if (deleteMutation.isSuccess && deleteMutation.variables) {
      sessionStorage.setItem("carDeleted", deleteMutation.variables); // gem PK'en (så "Fortryd" ved hvilken bil)
      router.push("/mycar");
    }
  }, [deleteMutation.isSuccess, deleteMutation.variables, router]);

  if (isPending) {
    return (
      <>
        <Header title={plate} back="/mycar" />
        <main className="container-page pt-24 pb-nav" aria-busy="true">
          <span role="status" className="sr-only">Henter bil…</span>
          <div className="animate-pulse grid gap-24 lg:grid-cols-[3fr_2fr]">
            <div className="aspect-image rounded-4 bg-grey-100" />
            <div className="grid gap-12 content-start">
              <div className="h-48 w-1/2 rounded-2 bg-grey-100" />
              <div className="h-[5rem] rounded-2 bg-grey-100" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Header title="Min bil" back="/mycar" />
        <main className="container-page py-48 pb-nav">
          <div className="flex flex-col items-center text-center gap-12 max-w-md mx-auto">
            <span className="grid place-items-center w-64 h-64 rounded-full bg-primary-50 text-primary-800">
              <Icon iconName="car" />
            </span>
            <h2 className="text-md font-bold uppercase">Vi kan ikke finde bilen</h2>
            <p className="text-grey-200">Den er måske blevet fjernet fra din konto.</p>
            <Button elementType="link" linkHref="/mycar" size="sm" type="secondary" buttonName="Til mine biler" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title={car.car_licenseplate} back="/mycar" />
      <main className="container-page pt-24 pb-nav grid gap-24 lg:gap-40 lg:grid-cols-[3fr_2fr] lg:items-start">
        <div className="rounded-4 overflow-hidden border border-grey-100">
          <CarPhoto src={carImgSrc(car.car_image)} alt={`Billede af bilen ${car.car_licenseplate}`} />
        </div>

        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-12">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-800">Din bil</p>
            <LicensePlate plate={car.car_licenseplate} size="lg" className="self-start" />
          </div>

          <dl className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4 p-16 rounded-4 bg-surface-2 border border-grey-100">
              <dt className="text-xs font-bold uppercase tracking-[0.06em] text-grey-200">Nummerplade</dt>
              <dd className="font-bold uppercase">{car.car_licenseplate}</dd>
            </div>
            <div className="flex flex-col gap-4 p-16 rounded-4 bg-surface-2 border border-grey-100">
              <dt className="text-xs font-bold uppercase tracking-[0.06em] text-grey-200">Seneste vask</dt>
              <dd className="font-bold">{formatWashDate(car.car_most_recent_wash)}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-12">
            <Button
              elementType="link"
              linkHref="/locationlist"
              buttonName="Find en vaskehal"
              iconName="location"
              iconFlexPos="order-first"
              size="lg"
              type="primary"
            />
            <Button
              elementType="button"
              buttonName="Fjern bil"
              iconName="trash"
              iconFlexPos="order-first"
              size="lg"
              type="secondary"
              status="danger"
              dialogId="delete-car-dialog"
            />
          </div>
        </div>

        <Dialog
          id="delete-car-dialog"
          title="Fjern bilen?"
          description={`${car.car_licenseplate} bliver fjernet fra din konto. Du kan fortryde lige bagefter.`}
          buttonTwo={{
            elementType: "button",
            buttonName: "Annullér",
            size: "lg",
            type: "secondary",
            status: "normal",
          }}
          buttonThree={{
            elementType: "button",
            buttonName: deleteMutation.isPending ? "Fjerner…" : "Fjern",
            size: "lg",
            type: "primary",
            status: "danger",
            onClick: () => deleteMutation.mutate(car.car_pk),
          }}
        />
      </main>
    </>
  );
}
