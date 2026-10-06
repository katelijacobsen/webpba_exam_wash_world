"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import Icon from "@/app/global/components/Icon";
import { useState } from "react";
// custom hook
import { useSignup } from "../hooks/useSignup";
import { USER_PASSWORD_MIN, USER_PASSWORD_MAX, USER_PHONENUMBER_MIN, USER_PHONENUMBER_MAX, USER_FULLNAME_MIN, USER_FULLNAME_MAX, USER_ADDRESS_MIN, USER_ADDRESS_MAX } from "@/app/global/store/validation";
import AuthCard from "./AuthCard";

type Props = { onToggleLogin: () => void; focus?: boolean };

export default function SignupForm({ onToggleLogin, focus }: Props) {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [address, setAddress] = useState("");
  const signupMutation = useSignup();

  //Validering
  const errorData = (signupMutation.error as { response?: { data?: { tooltip?: string; error?: string } } } | null)?.response?.data;
  const tooltip = errorData?.tooltip;
  const errorMessage = errorData?.error;
  const errorFor = (field: string) => (tooltip === field ? errorMessage : undefined);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    //smid custom hook ind i submit funktionen
    signupMutation.mutate({
      user_fullname: fullname,
      user_phonenumber: phoneNumber,
      user_email: email,
      user_address: address,
      user_password: password,
    });
  }
  return (
    <AuthCard
      title="Opret bruger"
      intro="Det tager under et minut. Bagefter kan du tilføje din bil."
      autoFocusHeading={focus}
      footer={
        <>
          <p className="text-sm text-grey-200">Har du allerede en konto?</p>
          {/* Knap til at toggle mellem login og signup*/}
          <Button typeAction="button" type="tertiary" buttonName="Log ind" size="sm" onClick={onToggleLogin} />
        </>
      }
    >
      <form id="signupform" onSubmit={handleSubmit} className="flex flex-col gap-20">
        <fieldset className="grid gap-16 sm:grid-cols-2 border-0 p-0 m-0">
          <legend className="sr-only">Personlige oplysninger</legend>
          {/* Fulde Navn */}
          <div className="sm:col-span-2">
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
          </div>
          {/* Email */}
          <div className="sm:col-span-2">
            <Input
              type="email"
              name="email"
              label="email"
              inputLabel="Email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              error={errorFor("user_email")}
              required
            />
          </div>
          {/* Mobilnummer */}
          <Input
            type="tel"
            name="user_phonenumber"
            label="user_phonenumber"
            inputLabel="Telefon"
            autoComplete="tel"
            value={phoneNumber}
            onChange={setPhoneNumber}
            minLength={USER_PHONENUMBER_MIN}
            maxLength={USER_PHONENUMBER_MAX}
            error={errorFor("user_phonenumber")}
            required
          />
          {/* Adresse */}
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
          {/* Adgangskode */}
          <div className="sm:col-span-2">
            <Input
              type="password"
              name="user_password"
              label="user_password"
              inputLabel="Adgangskode"
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
              minLength={USER_PASSWORD_MIN}
              maxLength={USER_PASSWORD_MAX}
              error={errorFor("user_password")}
              required
            />
          </div>
        </fieldset>
        {/* Acceptere Vilkår */}
        <Input
          type="checkbox"
          name="acceptPolicy"
          label="acceptPolicy"
          inputLabel="Jeg accepterer handelsbetingelser og privatlivspolitik"
          checked={consent}
          onChange={setConsent}
          required={true}
        />
        {signupMutation.isSuccess && (
          <div role="status" className="flex items-start gap-8 p-12 rounded-2 bg-success-10-opacity text-success-text text-sm font-medium">
            <Icon iconName="circlecheck" size="sm" />
            <p>{signupMutation.data?.msg ?? "Bruger oprettet"}</p>
          </div>
        )}
        {signupMutation.isError && !tooltip && (
          <p role="alert" className="flex items-start gap-8 p-12 rounded-2 bg-danger-10-opacity text-danger-text text-sm font-medium">
            <Icon iconName="circleerror" size="sm" />
            Vi kunne ikke oprette brugeren. Prøv igen om lidt.
          </p>
        )}
        <Button
          id="signingup"
          typeAction="submit"
          elementType="button"
          buttonName={signupMutation.isPending ? "Opretter bruger…" : "Opret bruger"}
          disabled={signupMutation.isPending}
          size="lg"
          type="primary"
          status="normal"
        />
      </form>
    </AuthCard>
  );
}
