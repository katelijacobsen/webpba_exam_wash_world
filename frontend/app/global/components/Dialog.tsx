import Button from "./Button";
import Icon from "./Icon";
import { ButtonProps } from "./Button";
import type { IconNameType } from "./IconMap";

interface DialogProps {
  id: string;
  title?: string;
  description?: string;
  iconName?: IconNameType;
  tone?: "danger" | "normal";
  buttonOne?: ButtonProps;
  buttonTwo?: ButtonProps;
  buttonThree?: ButtonProps;
}

// Shared shell for native <dialog> modals (focus trap + Esc come for free)
export const dialogClass =
  "m-auto w-[min(calc(100vw-2rem),28rem)] max-h-[calc(100dvh-2rem)] p-0 rounded-8 bg-surface text-text border border-grey-100 shadow-raised overflow-y-auto";

export function DialogCloseButton() {
  return (
    <button
      type="submit"
      formNoValidate
      aria-label="Luk dialog"
      className="absolute top-12 right-12 grid place-items-center w-48 h-48 rounded-full text-grey-200 hover:text-text hover:bg-grey-100"
    >
      <Icon iconName="close" />
    </button>
  );
}

const Dialog = ({
  id,
  title,
  description,
  iconName = "trash",
  tone = "danger",
  buttonTwo,
  buttonThree,
}: DialogProps) => {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <dialog
      id={id}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className={dialogClass}
    >
      <form method="dialog" className="relative grid gap-24 p-24 pt-32 sm:p-32">
        <DialogCloseButton />

        <div className="grid justify-items-center text-center gap-16">
          <span
            className={`grid place-items-center w-64 h-64 rounded-full ${
              tone === "danger" ? "bg-danger-10-opacity text-danger-text" : "bg-primary-50 text-primary-800"
            }`}
          >
            <Icon iconName={iconName} size="md" />
          </span>
          <h2 id={titleId} className="text-md font-bold uppercase max-w-[22ch]">
            {title}
          </h2>
          {description && (
            <p id={descId} className="text-grey-200 max-w-[32ch]">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-12">
          {buttonTwo && <Button {...buttonTwo} size="lg" typeAction="submit" />}
          {buttonThree && <Button {...buttonThree} size="lg" typeAction="submit" />}
        </div>
      </form>
    </dialog>
  );
};

export default Dialog;
