"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import "../styles/snackbar.css";

interface SnackbarProps {
  message?: string;
  duration?: number;
  variant?: "success" | "error";
  onUndo?: () => void;
}

const Snackbar = ({
  message = "Gemt",
  duration = 5000,
  variant = "success",
  onUndo,
}: SnackbarProps) => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  // Timer pauses while hovered/focused so there's time to hit "Fortryd" (WCAG 2.2.1)
  const [paused, setPaused] = useState(false);
  const remaining = useRef(duration);
  const startedAt = useRef(0);

  useEffect(() => {
    if (paused || leaving) return;
    startedAt.current = Date.now();
    const leaveTimer = setTimeout(() => setLeaving(true), remaining.current);
    return () => {
      clearTimeout(leaveTimer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [paused, leaving]);

  useEffect(() => {
    if (!leaving) return;
    const removeTimer = setTimeout(() => setVisible(false), 250);
    return () => clearTimeout(removeTimer);
  }, [leaving]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`snackbar bg-bg-dark text-white flex items-center justify-between gap-12 pl-16 pr-8 py-8 min-h-[56px] rounded-4 shadow-raised ${leaving ? "snackbar--leaving" : ""}`}
    >
      <p className="flex items-center gap-10 font-medium py-8">
        <Icon
          iconName={variant === "success" ? "circlecheck" : "circleerror"}
          style={variant === "success" ? "text-primary-400" : "text-danger"}
        />
        {message}
      </p>

      <div className="flex items-center gap-4">
        {onUndo && (
          <button
            type="button"
            onClick={() => {
              onUndo();
              setLeaving(true);
            }}
            className="min-h-48 px-12 rounded-2 font-bold uppercase text-sm text-primary-400 hover:bg-white/10"
          >
            Fortryd
          </button>
        )}
        <button
          type="button"
          onClick={() => setLeaving(true)}
          aria-label="Luk besked"
          className="grid place-items-center w-40 h-40 rounded-full text-white/70 hover:text-white hover:bg-white/10"
        >
          <Icon iconName="close" size="sm" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
