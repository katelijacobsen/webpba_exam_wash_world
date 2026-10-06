"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import Icon from "@/app/global/components/Icon";
import { useState } from "react";
// custom hook
import { useResetPassword } from "../hooks/useResetPassword";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { USER_PASSWORD_MAX, USER_PASSWORD_MIN } from "@/app/global/store/validation";
import AuthCard from "./AuthCard";

type Props = { ResetKey: string };

export default function ResetPasswordForm({ ResetKey }: Props) {
    // useState
    const [resetPassword, setResetPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    // custom hook useLogin
    const resetPasswordMutation = useResetPassword();
    // Redirect
    const router = useRouter();
    const mismatch = confirmpassword.length > 0 && confirmpassword !== resetPassword;

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (mismatch) return;
        //smid custom hook ind i submit funktionen
        resetPasswordMutation.mutate({
            user_password: resetPassword,
            confirm_password: confirmpassword,
            key: ResetKey,
        });
    }
    // Redirect efter success for skifte password (lille pause så beskeden kan læses)
    useEffect(() => {
      if (!resetPasswordMutation.isSuccess) return;
      const t = setTimeout(() => router.push("/"), 1500);
      return () => clearTimeout(t);
    }, [resetPasswordMutation.isSuccess, router]);

  return (
    <AuthCard title="Ny adgangskode" intro="Vælg en ny adgangskode til din konto.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-20">
        <fieldset className="flex flex-col gap-16 border-0 p-0 m-0">
          <legend className="sr-only">Ny adgangskode</legend>
          <Input
            type="password"
            name="user_password"
            label="user_password"
            inputLabel="Ny adgangskode"
            autoComplete="new-password"
            value={resetPassword}
            onChange={setResetPassword}
            minLength={USER_PASSWORD_MIN}
            maxLength={USER_PASSWORD_MAX}
            required
          />
          <Input
            type="password"
            name="confirm_password"
            label="confirm_password"
            inputLabel="Gentag ny adgangskode"
            autoComplete="new-password"
            value={confirmpassword}
            onChange={setConfirmPassword}
            error={mismatch ? "Adgangskoderne er ikke ens" : undefined}
            required
          />
        </fieldset>
        {resetPasswordMutation.isError && (
          <p role="alert" className="flex items-start gap-8 p-12 rounded-2 bg-danger-10-opacity text-danger-text text-sm font-medium">
            <Icon iconName="circleerror" size="sm" />
            Ugyldig adgangskode eller udløbet link.
          </p>
        )}
        {resetPasswordMutation.isSuccess && (
          <p role="status" className="flex items-start gap-8 p-12 rounded-2 bg-success-10-opacity text-success-text text-sm font-medium">
            <Icon iconName="circlecheck" size="sm" />
            Adgangskoden er ændret. Du sendes videre til log ind…
          </p>
        )}
        <Button
          typeAction="submit"
          buttonName={resetPasswordMutation.isPending ? "Gemmer…" : "Gem adgangskode"}
          disabled={resetPasswordMutation.isPending}
          size="lg"
        />
      </form>
    </AuthCard>
  );
}
