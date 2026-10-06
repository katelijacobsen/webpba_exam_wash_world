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
}

const Button = ({
  id = "",
  buttonName,
  size,
  elementType = "button",
  dialogId,
  linkHref,
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
}: ButtonProps) => {
  const router = useRouter();

  const sizeStyle = {
    lg: "w-full py-12 px-16 min-h-[44px]",
    sm: "w-fit py-10 px-12 min-h-[44px]",
    xs: "w-fit px-8 min-h-[44px] leading-none",
  };

  const statusStyles = {
    primary: {
      normal: "bg-primary-400 border-2 border-primary-800 text-bg-dark hover:bg-primary-600",
      danger: "bg-danger border-2 border-danger text-bg hover:opacity-90",
      success: "bg-success border-2 border-success text-bg hover:opacity-90",
    },
    secondary: {
      normal: "bg-primary-50 border-2 border-primary-100 text-primary-800 hover:bg-primary-100",
      danger: "bg-danger-10-opacity border-2 border-danger text-danger hover:bg-danger/20",
      success: "bg-success-10-opacity border-2 border-success text-success hover:bg-success/20",
    },
    tertiary: {
      normal: `border-b-2 ${size === "xs" ? "border-primary-400 text-primary-400" : "border-primary-800 text-primary-800"} hover:opacity-70`,
      danger: "border-b-2 border-danger text-danger hover:opacity-70",
      success: "border-b-2 border-success text-success hover:opacity-70",
    },
    none: {
      normal: "text-primary-800 hover:text-primary-600",
      danger: "text-danger hover:opacity-70",
      success: "text-success hover:opacity-70",
    },
  };

  const iconStyle = status === "danger" ? "text-danger" : status === "success" ? "text-success" : "";
  const isIconOnly = !buttonName && !!iconName;

  let buttonStyle = "";
  if (type === "primary")   buttonStyle = `rounded-8 ${statusStyles.primary[status]} ${sizeStyle[size]}`;
  if (type === "secondary") buttonStyle = `rounded-8 ${statusStyles.secondary[status]} ${sizeStyle[size]}`;
  if (type === "tertiary")  buttonStyle = `${statusStyles.tertiary[status]} ${sizeStyle[size]}`;
  if (type === "none")      buttonStyle = `${statusStyles.none[status]}`;

  const commonClass = `h-fit flex justify-center items-center font-bold uppercase ${buttonStyle} ${iconName && buttonName ? "gap-8" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const content = (
    <>
      {buttonName && <span>{buttonName}</span>}
      {iconName && <Icon iconName={iconName} style={`${iconFlexPos ?? ""} ${iconStyle}`} />}
    </>
  );

  return (
    <div className={`flex items-center gap-8 ${size === "lg" ? "w-full" : ""}`}>
      {elementType === "button" ? (
        <>
          <button
            id={id}
            type={typeAction}
            disabled={disabled}
            aria-label={isIconOnly ? (ariaLabel ?? iconName) : ariaLabel}
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
          {isPage && maxPage && <p>{isPage}/{maxPage}</p>}
        </>
      ) : (
        <>
          <Link
            href={linkHref || "#"}
            aria-label={isIconOnly ? (ariaLabel ?? iconName) : ariaLabel}
            aria-disabled={disabled}
            onClick={goBack ? (e) => { e.preventDefault(); router.back(); } : undefined}
            className={commonClass}
          >
            {content}
          </Link>
          {isPage && maxPage && <p>{isPage}/{maxPage}</p>}
        </>
      )}
    </div>
  );
};

export default Button;
