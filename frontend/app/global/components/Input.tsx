"use client";

import { useState } from "react";
import { REGEX_EMAIL } from "@/app/global/store/validation";
import "../styles/validation.css";

type Validation = {
  autoComplete?: string;
  title?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
};

type inputTextField = { type: "text";     name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputEmail    = { type: "email";    name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputTel      = { type: "tel";      name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputPassword = { type: "password"; name: string; value: string;  label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;
type inputNumber   = { type: "number";   name: string; value: number;  label: string; inputLabel: string; inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"]; max?: number; min?: number; onChange: (value: number) => void; } & Validation;
type inputCheckbox = { type: "checkbox"; name: string; checked: boolean; label: string; inputLabel: string; onChange: (value: boolean) => void; } & Validation;
type inputRadio    = { type: "radio";    name: string; label: string; inputLabel: string; onChange: (value: string) => void; } & Validation;

type inputType = inputTextField | inputEmail | inputTel | inputPassword | inputNumber | inputCheckbox | inputRadio;

function getHintText(type: string, minLength?: number, maxLength?: number): string | null {
  if (type === "email") return "Must be a valid email address";
  if (minLength && maxLength) return `Must be between ${minLength} and ${maxLength} characters`;
  if (minLength) return `Must be at least ${minLength} characters`;
  return null;
}

function getValidationClass(value: string, type?: string, minLength?: number) {
  if (value.length === 0) return "bg-surface border-primary-100 border-2";
  if (type === "email") return REGEX_EMAIL.test(value) ? "success" : "error";
  if (!minLength) return "bg-surface border-primary-100 border-2";
  return value.length < minLength ? "error" : "success";
}

const sharedInputClass = "p-12 rounded-8 w-full";

export default function Input(props: inputType) {
  const [isFocused, setIsFocused] = useState(false);

  const hint      = getHintText(props.type, props.minLength, props.maxLength);
  const hintId    = `${props.name}-hint`;
  const stringValue = typeof (props as any).value === "string" ? (props as any).value as string : "";
  const validationClass = getValidationClass(stringValue, props.type, props.minLength);
  const isInvalid = validationClass === "error";
  const showHint  = isFocused || isInvalid;

  const sharedTextProps = {
    id: props.name,
    name: props.name,
    required: props.required,
    title: props.title,
    minLength: props.minLength,
    maxLength: props.maxLength,
    pattern: props.pattern,
    autoComplete: props.autoComplete,
    "aria-invalid": isInvalid ? ("true" as const) : undefined,
    "aria-describedby": hint ? hintId : undefined,
    onFocus: () => setIsFocused(true),
    onBlur:  () => setIsFocused(false),
    className: `${validationClass} ${sharedInputClass}`,
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={props.name} className="font-bold text-sm">
        {props.inputLabel}
        {props.required && <span aria-hidden="true" className="text-danger ml-4">*</span>}
      </label>

      {props.type === "text"     && <input type="text"     value={props.value}   onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}
      {props.type === "email"    && <input type="email"    value={props.value}   onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}
      {props.type === "tel"      && <input type="tel"      value={props.value}   onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}
      {props.type === "password" && <input type="password" value={props.value}   onChange={(e) => props.onChange(e.target.value)} {...sharedTextProps} />}

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
          className={`bg-surface border-primary-100 border-2 ${sharedInputClass}`}
        />
      )}

      {props.type === "checkbox" && (
        <div className="flex items-center gap-8">
          <input
            id={props.name}
            type="checkbox"
            name={props.name}
            required={props.required}
            title={props.title}
            autoComplete={props.autoComplete}
            checked={props.checked}
            onChange={(e) => props.onChange(e.target.checked)}
            className="w-[20px] h-[20px] accent-primary-400 cursor-pointer"
          />
          <span className="text-sm">{props.inputLabel}</span>
        </div>
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
          className="w-[20px] h-[20px] accent-primary-400 cursor-pointer"
        />
      )}

      {showHint && hint && (
        <span
          id={hintId}
          role={isInvalid ? "alert" : undefined}
          aria-live={isInvalid ? "polite" : undefined}
          className={`text-sm ${isInvalid ? "text-danger" : "text-grey-400"}`}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
