"use client";

import { useState } from "react";
import { useCreateCar } from "../hooks/useCreateCar";
import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import CarImage from "./CarImage";
import { CAR_LICENSEPLATE_MAX, CAR_LICENSEPLATE_MIN } from "@/app/global/store/validation";
import { CarProps } from "../types/types";

export default function CarForm({ onSuccess, onCancel, titleId }: CarProps) {
  const [licenseplate, setLicenseplate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const createMutation = useCreateCar();

  const re =
    licenseplate.trim().length >= CAR_LICENSEPLATE_MIN &&
    licenseplate.trim().length <= CAR_LICENSEPLATE_MAX;

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!re) return;
    createMutation.mutate(
      { car_licenseplate: licenseplate.trim().toUpperCase(), car_image: image },
      {
        onSuccess: () => {
          setLicenseplate("");
          setImage(null);
          setResetKey((k) => k + 1);
          onSuccess?.();          // luk dialog + vis snackbar — én gang
        },
      }
    );
  }
  const error_msg = (createMutation.error as { response?: { data?: { msg?: string } } } | null)?.response?.data?.msg;

  return (
    <form onSubmit={handleSubmit} className="grid gap-24">
      <div className="grid gap-8 pr-48">
        <h2 id={titleId} className="text-md font-bold uppercase">Tilføj bil</h2>
        <p className="text-sm text-grey-200">Vi bruger nummerpladen til at genkende din bil i vaskehallen.</p>
      </div>

      <Input
        type="text"
        name="car_licenseplate"
        label="car_licenseplate"
        inputLabel="Nummerplade"
        placeholder="AB 12 345"
        autoComplete="off"
        value={licenseplate}
        onChange={setLicenseplate}
        minLength={CAR_LICENSEPLATE_MIN}
        maxLength={CAR_LICENSEPLATE_MAX}
        error={error_msg}
        required
      />

      <CarImage key={resetKey} onSelect={setImage} />

      <div className="grid grid-cols-2 gap-12">
        <Button
          typeAction="button"
          elementType="button"
          buttonName="Annullér"
          size="lg"
          type="secondary"
          onClick={onCancel}
        />
        <Button
          typeAction="submit"
          elementType="button"
          buttonName={createMutation.isPending ? "Tilføjer…" : "Tilføj"}
          disabled={createMutation.isPending}
          size="lg"
          type="primary"
        />
      </div>
    </form>
  );
}
