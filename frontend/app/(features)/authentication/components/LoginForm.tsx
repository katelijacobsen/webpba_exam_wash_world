"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import { useState, useEffect } from "react";
// Nextjs Router til at redirecte brugeren
import { useRouter } from "next/navigation";
// custom hook
import { useLogin } from "../hooks/useLogin";
import { USER_PASSWORD_MIN, USER_PASSWORD_MAX } from "@/app/global/store/validation";
import "../../../global/styles/validation.css"

type Props = { onToggleSignup: () => void; onForgotPassword: () => void };

export default function LoginForm({ onToggleSignup, onForgotPassword }: Props) {
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
    <>
      <form onSubmit={handleSubmit} className="bg-surface rounded-12 border border-grey-100 p-32 flex flex-col gap-24">
        <fieldset className="flex flex-col gap-16 border-none p-0">
          <legend className="font-bold text-md mb-8">Log ind</legend>
          <Input
            type="email"
            name="email"
            label="email"
            inputLabel="Email"
            value={email}
            autoComplete="email"
            onChange={setEmail}
          />
          <Input
            type="password"
            name="user_password"
            label="user_password"
            inputLabel="Password"
            value={password}
            onChange={setPassword}
            minLength={USER_PASSWORD_MIN}
            maxLength={USER_PASSWORD_MAX}
            // changed this like from {password}, because autoComplete on an HTML input expects a fixed hint string that tells
            // the browser what kind of data this field holds and not what value it should hold. so in other words,
            // It needs to know it's a password, not specifically which password. (det samme med email)
            autoComplete="current-password"
          />
        </fieldset>
        {/* Sender error beskeden ned til vores loginMutation */}
        {loginMutation.isError && (
          <p role="alert" className="text-danger text-sm font-medium">Login fejlede — tjek din email og adgangskode.</p>
        )}
        <Button
          typeAction="submit"
          buttonName={loginMutation.isPending ? "Logger ind..." : "Log ind"}
          size="lg"
        />
        <Button
          id="signup"
          typeAction="button"
          elementType="button"
          type={"tertiary"}
          buttonName="Sign up"
          size="lg"
          onClick={onToggleSignup}
        />
        <Button
          typeAction="button"
          elementType="button"
          type={"tertiary"}
          buttonName="Forgot password? Reset here"
          size="lg"
          onClick={onForgotPassword}
        />
      </form>
    </>
  );
}
