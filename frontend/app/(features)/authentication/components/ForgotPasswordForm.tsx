"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import Icon from "@/app/global/components/Icon";
import { useState } from "react";
// custom hook
import { useForgotPassword } from "../hooks/useForgotPassword";
import AuthCard from "./AuthCard";

type Props = { onToggleLogin: () => void, onToggleSignup: () => void, focus?: boolean };

export default function ForgotPasswordForm({ onToggleLogin, onToggleSignup, focus }: Props) {
  // useState
  const [forgotPassword, setForgetPassword] = useState("");
  // custom hook useLogin
  const signupMutation = useForgotPassword();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    //smid custom hook ind i submit funktionen
    signupMutation.mutate({
      user_email: forgotPassword,
    });
  }

  return (
    <AuthCard
      title="Glemt adgangskode"
      intro="Skriv din email, så sender vi et link til at vælge en ny adgangskode."
      autoFocusHeading={focus}
      footer={
        <div className="flex flex-wrap justify-center gap-x-24">
          <Button typeAction="button" elementType="button" type="tertiary" buttonName="Tilbage til log ind" size="sm" onClick={onToggleLogin} />
          <Button typeAction="button" elementType="button" type="tertiary" buttonName="Opret bruger" size="sm" onClick={onToggleSignup} />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-20">
        <Input
          type="email"
          name="forgot_password"
          label="Email"
          inputLabel="Email"
          autoComplete="email"
          value={forgotPassword}
          onChange={setForgetPassword}
          required
        />
        {signupMutation.isError && (
          <p role="alert" className="flex items-start gap-8 p-12 rounded-2 bg-danger-10-opacity text-danger-text text-sm font-medium">
            <Icon iconName="circleerror" size="sm" />
            Vi kunne ikke sende mailen. Tjek adressen og prøv igen.
          </p>
        )}
        {signupMutation.isSuccess && (
          <p role="status" className="flex items-start gap-8 p-12 rounded-2 bg-success-10-opacity text-success-text text-sm font-medium">
            <Icon iconName="circlecheck" size="sm" />
            Tjek din indbakke — vi har sendt dig et link.
          </p>
        )}
        <Button
          typeAction="submit"
          buttonName={signupMutation.isPending ? "Sender…" : "Send link"}
          disabled={signupMutation.isPending}
          iconName="send"
          size="lg"
        />
      </form>
    </AuthCard>
  );
}
