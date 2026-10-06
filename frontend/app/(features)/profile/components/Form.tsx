"use client";

import { User } from "@/app/global/types/global";
import { useEffect, useState } from "react";
import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
// custom hook
import { useUpdateUser } from "../hooks/useUpdateUser";
import { USER_PHONENUMBER_MIN, USER_PHONENUMBER_MAX, USER_FULLNAME_MIN, USER_FULLNAME_MAX, USER_ADDRESS_MIN, USER_ADDRESS_MAX } from "@/app/global/store/validation";

type Props = { user: User; onSave: () => void; onCancel: () => void };

export default function Form({ user, onSave, onCancel }: Props) {
  // Sætter i hver personlige info den nuværende info
  const [fullname, setFullname] = useState(user.user_fullname);
  const [email, setEmail] = useState(user.user_email);
  const [phoneNumber, setPhoneNumber] = useState(user.user_phonenumber);
  const [address, setAddress] = useState(user.user_address);
  const updateMutation = useUpdateUser();
  const errorData = (updateMutation.error as { response?: { data?: { tooltip?: string; error?: string } } } | null)?.response?.data;
  const tooltip = errorData?.tooltip;
  const errorMessage = errorData?.error;
  const errorFor = (field: string) => (tooltip === field ? errorMessage : undefined);

  useEffect(() => {
    if (updateMutation.isSuccess) onSave();
  }, [updateMutation.isSuccess, onSave]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate({
      user_fullname: fullname,
      user_email: email,
      user_phonenumber: phoneNumber,
      user_address: address,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-24">
      <fieldset className="grid gap-16 sm:grid-cols-2 border-0 p-0 m-0">
        <legend className="sr-only">Personlige oplysninger</legend>

        <Input
          type="text"
          name="user_fullname"
          label="user_fullname"
          inputLabel="Fulde navn"
          autoComplete="name"
          value={fullname}
          onChange={setFullname}
          minLength={USER_FULLNAME_MIN}
          maxLength={USER_FULLNAME_MAX}
          error={errorFor("user_fullname")}
          required
        />

        <Input
          type="email"
          name="user_email"
          label="user_email"
          inputLabel="Email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
          error={errorFor("user_email")}
          required
        />

        <Input
          type="tel"
          name="user_phonenumber"
          label="user_phonenumber"
          inputLabel="Telefonnummer"
          autoComplete="tel"
          value={phoneNumber}
          onChange={setPhoneNumber}
          minLength={USER_PHONENUMBER_MIN}
          maxLength={USER_PHONENUMBER_MAX}
          error={errorFor("user_phonenumber")}
          required
        />

        <Input
          type="text"
          name="user_address"
          label="user_address"
          inputLabel="Adresse"
          autoComplete="street-address"
          value={address}
          onChange={setAddress}
          minLength={USER_ADDRESS_MIN}
          maxLength={USER_ADDRESS_MAX}
          error={errorFor("user_address")}
          required
        />
      </fieldset>

      {updateMutation.isError && !tooltip && (
        <p role="alert" className="text-sm font-medium text-danger-text">
          Vi kunne ikke gemme dine ændringer. Prøv igen.
        </p>
      )}

      <div className="grid grid-cols-2 gap-12 sm:flex sm:justify-end">
        <Button
          typeAction="button"
          elementType="button"
          buttonName="Annullér"
          size="sm"
          type="secondary"
          className="max-sm:w-full"
          onClick={onCancel}
        />
        <Button
          typeAction="submit"
          elementType="button"
          buttonName={updateMutation.isPending ? "Gemmer…" : "Gem"}
          disabled={updateMutation.isPending}
          size="sm"
          type="primary"
          className="max-sm:w-full"
        />
      </div>
    </form>
  );
}
