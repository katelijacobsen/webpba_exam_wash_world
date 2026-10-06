"use client";

import { useState } from "react";
import { REGEX_EMAIL } from "@/app/global/store/validation";
import Icon from "./Icon";
import "../styles/validation.css";

type Validation = {
  autoComplete?: string;
  title?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
  // Error from the server (e.g. "email already in use") — shown under the field
  error?: string;
};

type inputTextField = { type: "text";     name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputEmail    = { type: "email";    name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputTel      = { type: "tel";      name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputPassword = { type: "password"; name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputNumber   = { type: "number";   name: string; value: number;  label: string; inputLabel: string; inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"]; max?: number; min?: number; onChange: (value: number) => void; } & Validation;
type inputCheckbox = { type: "checkbox"; name: string; checked: boolean; label: string; inputLabel: React.ReactNode; onChange: (value: boolean) => void; } & Validation;
type inputRadio    = { type: "radio";    name: string; label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;

type inputType = inputTextField | inputEmail | inputTel | inputPassword | inputNumber | inputCheckbox | inputRadio;

function getHintText(type: string, minLength?: number, maxLength?: number): string | null {
  if (type === "email") return "Skal være en gyldig email-adresse";
  if (minLength && maxLength) return `Skal være mellem ${minLength} og ${maxLength} tegn`;
  if (minLength) return `Skal være mindst ${minLength} tegn`;
  return null;
}

function getValidationClass(value: string, type?: string, minLength?: number) {
  if (value.length === 0) return "";
  if (type === "email") return REGEX_EMAIL.test(value) ? "success" : "error";
  if (!minLength) return "";
  return value.length < minLength ? "error" : "success";
}

const inputMode: Record<string, React.HTMLAttributes<HTMLInputElement>["inputMode"]> = {
  email: "email",
  tel: "tel",
};

export default function Input(props: inputType) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Checkbox: one label wrapping box + text, so the whole row is clickable
  if (props.type === "checkbox") {
    return (
      <div className="flex flex-col gap-6">
        <label htmlFor={props.name} className="flex items-start gap-12 min-h-48 py-8 cursor-pointer select-none">
          <input
            id={props.name}
            type="checkbox"
            name={props.name}
            required={props.required}
            title={props.title}
            checked={props.checked}
            aria-invalid={props.error ? true : undefined}
            aria-describedby={props.error ? `${props.name}-error` : undefined}
            onChange={(e) => props.onChange(e.target.checked)}
            className="mt-2 w-24 h-24 shrink-0 accent-primary-600 cursor-pointer"
          />
          <span className="text-sm leading-snug pt-2">
            {props.inputLabel}
            {props.required && <span aria-hidden="true" className="text-danger-text ml-4">*</span>}
          </span>
        </label>
        {props.error && (
          <p id={`${props.name}-error`} className="flex items-center gap-6 text-sm text-danger-text font-medium">
            <Icon iconName="circleerror" size="xs" /> {props.error}
          </p>
        )}
      </div>
    );
  }

  const hint = getHintText(props.type, props.minLength, props.maxLength);
  const hintId = `${props.name}-hint`;
  const errorId = `${props.name}-error`;
  const stringValue = typeof (props as { value?: unknown }).value === "string" ? ((props as { value: string }).value) : "";
  const validationClass = props.error ? "error" : getValidationClass(stringValue, props.type, props.minLength);
  const isInvalid = validationClass === "error";
  const isValid = validationClass === "success";
  const showHint = !props.error && hint && (isFocused || isInvalid);
  const describedBy = [props.error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
  const isPassword = props.type === "password";

  const sharedTextProps = {
    id: props.name,
    name: props.name,
    required: props.required,
    title: props.title,
    minLength: props.minLength,
    maxLength: props.maxLength,
    pattern: props.pattern,
    autoComplete: props.autoComplete,
    placeholder: props.placeholder,
    inputMode: inputMode[props.type],
    "aria-invalid": isInvalid ? ("true" as const) : undefined,
    "aria-describedby": describedBy,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: `field ${validationClass} w-full min-h-48 px-16 py-12 text-text placeholder:text-grey-200/70 ${
      isPassword ? "pr-[56px]" : isValid || isInvalid ? "pr-48" : ""
    }`,
  };

  return (
    <div className="flex flex-col gap-6">
      <label htmlFor={props.name} className="font-bold text-sm uppercase tracking-[0.03em]">
        {props.inputLabel}
        {props.required && <span aria-hidden="true" className="text-danger-text ml-4">*</span>}
      </label>

      <div className="relative">
        {props.type === "text"  && <input type="text"  value={props.value} onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}
        {props.type === "email" && <input type="email" value={props.value} onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}
        {props.type === "tel"   && <input type="tel"   value={props.value} onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}
        {isPassword && (
          <input
            type={showPassword ? "text" : "password"}
            value={(props as inputPassword).value}
            onChange={(e) => (props as inputPassword).onChange(e.target.value)}
            {...sharedTextProps}
          />
        )}

        {props.type === "number" && (
          <input
            id={props.name}
            type="number"
            value={props.value}
            name={props.name}
            inputMode={props.inputMode}
            required={props.required}
            title={props.title}
            min={props.min}
            max={props.max}
            autoComplete={props.autoComplete}
            onChange={(e) => props.onChange(Number(e.target.value))}
            className="field w-full min-h-48 px-16 py-12"
          />
        )}

        {props.type === "radio" && (
          <input
            id={props.name}
            type="radio"
            name={props.name}
            required={props.required}
            title={props.title}
            autoComplete={props.autoComplete}
            onChange={(e) => props.onChange(e.target.value)}
            className="w-24 h-24 accent-primary-600 cursor-pointer"
          />
        )}

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Skjul adgangskode" : "Vis adgangskode"}
            aria-pressed={showPassword}
            aria-controls={props.name}
            className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center w-48 h-40 rounded-2 text-grey-200 hover:text-text"
          >
            <Icon iconName={showPassword ? "eyeclose" : "eyeopen"} size="sm" />
          </button>
        ) : (
          (isValid || isInvalid) && (
            <Icon
              iconName={isValid ? "circlecheck" : "circleerror"}
              size="sm"
              style={`absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none ${isValid ? "text-success-text" : "text-danger-text"}`}
            />
          )
        )}
      </div>

      {props.error && (
        <p id={errorId} role="alert" className="flex items-center gap-6 text-sm text-danger-text font-medium">
          <Icon iconName="circleerror" size="xs" /> {props.error}
        </p>
      )}

      {/* Rendered always (hidden when not needed) so aria-describedby never points at nothing */}
      {hint && (
        <span
          id={hintId}
          aria-live={isInvalid ? "polite" : undefined}
          hidden={!showHint}
          className={`text-sm ${isInvalid ? "text-danger-text font-medium" : "text-grey-200"}`}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
