"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import Icon from "@/app/global/components/Icon";
import { useState, useEffect } from "react";
// Nextjs Router til at redirecte brugeren
import { useRouter } from "next/navigation";
// custom hook
import { useLogin } from "../hooks/useLogin";
import { USER_PASSWORD_MIN, USER_PASSWORD_MAX } from "@/app/global/store/validation";
import AuthCard from "./AuthCard";

type Props = { onToggleSignup: () => void; onForgotPassword: () => void; focus?: boolean };

export default function LoginForm({ onToggleSignup, onForgotPassword, focus }: Props) {
  // useState
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  // custom hook useLogin
  const loginMutation = useLogin();
  // useEffect for hvis login er success så bliver
  //  brugeren sendt vider til dashboard
  useEffect(() => {
    if (loginMutation.isSuccess) {
      router.push('/dashboard');
    }
  }, [loginMutation.isSuccess, router])

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    //smid custom hook ind i submit funktionen
    loginMutation.mutate({
      user_email: email,
      user_password: password,
    });
  }

  return (
    <AuthCard
      title="Log ind"
      intro="Velkommen tilbage. Log ind for at se dine biler og finde en vask."
      autoFocusHeading={focus}
      footer={
        <>
          <p className="text-sm text-grey-200">Har du ikke en konto?</p>
          <Button
            id="signup"
            typeAction="button"
            elementType="button"
            type="tertiary"
            buttonName="Opret bruger"
            size="sm"
            onClick={onToggleSignup}
          />
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-20" noValidate={false}>
        <fieldset className="flex flex-col gap-16 border-none p-0 m-0">
          <legend className="sr-only">Login-oplysninger</legend>
          <Input
            type="email"
            name="email"
            label="email"
            inputLabel="Email"
            value={email}
            autoComplete="email"
            placeholder="navn@eksempel.dk"
            onChange={setEmail}
            required
          />
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              name="user_password"
              label="user_password"
              inputLabel="Adgangskode"
              value={password}
              onChange={setPassword}
              minLength={USER_PASSWORD_MIN}
              maxLength={USER_PASSWORD_MAX}
              // changed this like from {password}, because autoComplete on an HTML input expects a fixed hint string that tells
              // the browser what kind of data this field holds and not what value it should hold. so in other words,
              // It needs to know it's a password, not specifically which password. (det samme med email)
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={onForgotPassword}
              className="self-end min-h-40 text-sm font-bold text-primary-800 underline decoration-primary-400 decoration-2 underline-offset-4 hover:decoration-primary-800"
            >
              Glemt adgangskode?
            </button>
          </div>
        </fieldset>
        {/* Sender error beskeden ned til vores loginMutation */}
        {loginMutation.isError && (
          <p role="alert" className="flex items-start gap-8 p-12 rounded-2 bg-danger-10-opacity text-danger-text text-sm font-medium">
            <Icon iconName="circleerror" size="sm" />
            Login fejlede — tjek din email og adgangskode.
          </p>
        )}
        <Button
          typeAction="submit"
          buttonName={loginMutation.isPending ? "Logger ind…" : "Log ind"}
          disabled={loginMutation.isPending}
          iconName="next"
          size="lg"
        />
      </form>
    </AuthCard>
  );
}
