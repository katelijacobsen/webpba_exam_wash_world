"use client"
import Link from "next/link";
import Icon from "./Icon";
import { IconNameType } from "./IconMap";
import { useRouter } from "next/navigation";

export interface ButtonProps {
  id?: string;
  typeAction?: "button" | "submit" | "reset";
  elementType?: "link" | "button";
  goBack?: boolean;
  linkHref?: string;
  // Opens linkHref in a new tab (and tells screen readers that it does)
  external?: boolean;
  buttonName?: string;
  size: "lg" | "sm" | "xs";
  dialogId?: string;
  iconName?: IconNameType;
  iconFlexPos?: string;
  isPage?: string;
  maxPage?: string;
  type?: "primary" | "secondary" | "tertiary" | "none";
  status?: "danger" | "success" | "normal";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const Button = ({
  id,
  buttonName,
  size,
  elementType = "button",
  dialogId,
  linkHref,
  external,
  goBack,
  type = "primary",
  status = "normal",
  iconName,
  iconFlexPos,
  isPage,
  maxPage,
  onClick,
  typeAction = "button",
  disabled,
  ariaLabel,
  className = "",
}: ButtonProps) => {
  const router = useRouter();

  // Every size keeps a 48px tap target (WCAG 2.5.8 / Figma min-height)
  const sizeStyle = {
    lg: "w-full min-h-48 px-16 py-12",
    sm: "w-fit min-h-48 px-16 py-12",
    xs: "w-fit min-h-48 px-8",
  };

  const statusStyles = {
    primary: {
      normal: "bg-primary-400 text-bg-dark bevel [--bevel-color:var(--color-primary-600)] hover:bg-[#05ad5c] active:translate-y-px",
      danger: "bg-danger-text text-white bevel [--bevel-color:#7f1913] hover:bg-[#9c1f18] active:translate-y-px",
      success: "bg-success-text text-white bevel [--bevel-color:#124515] hover:bg-[#175a1b] active:translate-y-px",
    },
    secondary: {
      normal: "bg-primary-50 border-2 border-primary-100 text-primary-800 hover:bg-primary-100 hover:border-primary-200",
      danger: "bg-danger-10-opacity border-2 border-danger/40 text-danger-text hover:bg-danger/15",
      success: "bg-success-10-opacity border-2 border-success/40 text-success-text hover:bg-success/15",
    },
    tertiary: {
      normal: "text-primary-800 underline decoration-2 decoration-primary-400 underline-offset-[6px] hover:decoration-primary-800",
      danger: "text-danger-text underline decoration-2 decoration-danger/50 underline-offset-[6px] hover:decoration-danger-text",
      success: "text-success-text underline decoration-2 decoration-success/50 underline-offset-[6px] hover:decoration-success-text",
    },
    none: {
      normal: "text-text hover:text-primary-800",
      danger: "text-danger-text hover:opacity-80",
      success: "text-success-text hover:opacity-80",
    },
  };

  const isIconOnly = !buttonName && !!iconName;

  const buttonStyle =
    type === "none"
      ? `${statusStyles.none[status]} ${isIconOnly ? "min-w-48 min-h-48 -m-12 rounded-full hover:bg-grey-100" : ""}`
      : `rounded-2 ${statusStyles[type][status]} ${sizeStyle[size]}`;

  const commonClass = [
    "inline-flex justify-center items-center gap-8 font-bold uppercase tracking-[0.02em] leading-none text-base select-none",
    buttonStyle,
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ].join(" ");

  const label = isIconOnly ? (ariaLabel ?? iconName) : ariaLabel;

  const content = (
    <>
      {buttonName && <span>{buttonName}</span>}
      {iconName && <Icon iconName={iconName} style={iconFlexPos ?? ""} />}
      {external && <span className="sr-only"> (åbner i nyt vindue)</span>}
    </>
  );

  const element =
    elementType === "button" ? (
      <button
        id={id}
        type={typeAction}
        disabled={disabled}
        aria-label={label}
        onClick={() => {
          if (dialogId) {
            (document.getElementById(dialogId) as HTMLDialogElement | null)?.showModal();
          }
          onClick?.();
        }}
        className={commonClass}
      >
        {content}
      </button>
    ) : external ? (
      <a
        id={id}
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={commonClass}
      >
        {content}
      </a>
    ) : (
      <Link
        id={id}
        href={linkHref || "#"}
        aria-label={label}
        aria-disabled={disabled}
        onClick={goBack ? (e) => { e.preventDefault(); router.back(); } : onClick}
        className={commonClass}
      >
        {content}
      </Link>
    );

  if (!(isPage && maxPage)) return element;

  return (
    <div className={`flex items-center gap-8 ${size === "lg" ? "w-full" : ""}`}>
      {element}
      <p>{isPage}/{maxPage}</p>
    </div>
  );
};

export default Button;
