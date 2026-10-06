"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import { useState } from "react";
// custom hook
import { useSignup } from "../hooks/useSignup";
import { USER_PASSWORD_MIN, USER_PASSWORD_MAX, USER_PHONENUMBER_MIN, USER_PHONENUMBER_MAX, USER_FULLNAME_MIN, USER_FULLNAME_MAX, USER_ADDRESS_MIN, USER_ADDRESS_MAX } from "@/app/global/store/validation";
import "../../../global/styles/validation.css"


type Props = { onToggleLogin: () => void };

export default function SignupForm({ onToggleLogin }: Props) {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseplate, setLicenseplate] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [address, setAddress] = useState("");
  const signupMutation = useSignup();

  //Validering
  const errorData = (signupMutation.error as any)?.response?.data;
  const tooltip = errorData?.tooltip as string | undefined;
  const errorMessage = errorData?.error as string | undefined;

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
    <form id="signupform" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Personal Information</legend>
        {/* Fulde Navn */}
        <Input
          type="text"
          name="user_fullname"
          label="user_fullname"
          inputLabel="Full Name"
          value={fullname}
          onChange={setFullname}
          minLength={USER_FULLNAME_MIN}
          maxLength={USER_FULLNAME_MAX}
        />
        {tooltip === "user_fullname" && <p role="alert" className="text-danger text-sm">{errorMessage}</p>}
        {/* Adresse */}
        <Input
          type="text"
          name="user_address"
          label="user_address"
          inputLabel="Address"
          value={address}
          onChange={setAddress}
          minLength={USER_ADDRESS_MIN}
          maxLength={USER_ADDRESS_MAX}
        />
        {tooltip === "user_address" && <p role="alert" className="text-danger text-sm">{errorMessage}</p>}
        {/* Mobilnummer */}
        <Input
          type="tel"
          name="user_phonenumber"
          label="user_phonenumber"
          inputLabel="Phonenumber"
          value={phoneNumber}
          onChange={setPhoneNumber}
          minLength={USER_PHONENUMBER_MIN}
          maxLength={USER_PHONENUMBER_MAX}
        />
        {tooltip === "user_phonenumber" && <p role="alert" className="text-danger text-sm">{errorMessage}</p>}
        {/* Email */}
        <Input
          type="email"
          name="email"
          label="email"
          inputLabel="Email"
          value={email}
          onChange={setEmail}
        />
        {tooltip === "user_email" && <p role="alert" className="text-danger text-sm">{errorMessage}</p>}
        {/* Adgangskode */}
        <Input
          type="password"
          name="user_password"
          label="user_password"
          inputLabel="Password"
          value={password}
          onChange={setPassword}
          minLength={USER_PASSWORD_MIN}
          maxLength={USER_PASSWORD_MAX}
        />
        {tooltip === "user_password" && <p role="alert" className="text-danger text-sm">{errorMessage}</p>}
      </fieldset>
      {/* Acceptere Vilkår */}
      <Input
        type="checkbox"
        name="acceptPolicy"
        label="acceptPolicy"
        inputLabel="Accept Policy"
        checked={consent}
        onChange={setConsent}
        required={true}
      />
      {signupMutation.isSuccess && <p role="status" className="text-success text-sm font-medium">{signupMutation.data?.msg ?? "Bruger oprettet"}</p>}
      <Button
        id="signingup"
        typeAction="submit"
        elementType="button"
        buttonName={
          signupMutation.isPending ? "Opretter bruger..." : "Opret Bruger"
        }
        size="lg"
        type="primary"
        status="normal"
      />
      {/* Knap til at toggle mellem login og signup*/}
      <Button
        typeAction="button"
        type={"tertiary"}
        buttonName="Login"
        size="lg"
        onClick={onToggleLogin}
      />
    </form>
  );
}
