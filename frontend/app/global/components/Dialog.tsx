import Button from "./Button";
import Icon from "./Icon";
import { ButtonProps } from "./Button";

interface DialogProps {
  id: string;
  title?: string;
  buttonOne?: ButtonProps;
  buttonTwo?: ButtonProps;
  buttonThree?: ButtonProps;
}

const Dialog = ({ id, title, buttonTwo, buttonThree }: DialogProps) => {
  const titleId = `${id}-title`;

  return (
    <dialog
      id={id}
      aria-labelledby={titleId}
      aria-modal="true"
      className="backdrop:bg-black/50 min-w-[280px] max-w-[336px] p-32 mt-80 mx-auto rounded-12 shadow-lg"
    >
      <form method="dialog" className="grid gap-32">
        <div className="flex items-start justify-between gap-8">
          <p id={titleId} className="uppercase text-center font-bold flex-1">{title}</p>
          <button
            type="submit"
            aria-label="Luk dialog"
            className="shrink-0 flex items-center justify-center w-[32px] h-[32px] rounded-8 text-grey-200 hover:text-text hover:bg-grey-100 focus-visible:outline-2 focus-visible:outline-primary-400"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <Icon iconName="trash" size="lg" style="justify-self-center text-primary-600" />

        <div className="flex justify-around gap-12">
          {buttonTwo   && <Button {...buttonTwo}   typeAction="submit" />}
          {buttonThree && <Button {...buttonThree} typeAction="submit" />}
        </div>
      </form>
    </dialog>
  );
};

export default Dialog;
