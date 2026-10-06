"use client";

import { useRef, useState } from "react";

type SheetState = "open" | "hidden";

// Bottom-sheet drag. Handlers go on the handle only (not the whole sheet), so links
// and buttons inside the sheet keep working. A tap without movement toggles the sheet,
// which also makes it work from the keyboard (Enter/Space on the handle button).
// peek = how much of the sheet stays visible when collapsed (any CSS length)
export function useDrag(peek = "96px") {
  const [sheetState, setSheetState] = useState<SheetState>("open");
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const moved = useRef(false);

  function onPointerDown(e: React.PointerEvent<HTMLElement>) {
    setIsDragging(true);
    moved.current = false;
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (!isDragging) return;
    const delta = e.clientY - startY.current;
    if (Math.abs(delta) > 4) moved.current = true;
    setDragDelta(delta);
  }

  function onPointerUp() {
    if (!isDragging) return;
    setIsDragging(false);
    if (sheetState === "open" && dragDelta > 60) setSheetState("hidden");
    else if (sheetState === "hidden" && dragDelta < -60) setSheetState("open");
    setDragDelta(0);
  }

  function onClick() {
    // A real drag already decided the state in onPointerUp
    if (moved.current) {
      moved.current = false;
      return;
    }
    setSheetState((s) => (s === "open" ? "hidden" : "open"));
  }

  const base = sheetState === "open" ? "0%" : `calc(100% - ${peek})`;
  const pull = sheetState === "open" ? Math.max(0, dragDelta) : Math.min(0, dragDelta);

  return {
    sheetState,
    isOpen: sheetState === "open",
    sheetStyle: {
      "--sheet-y": `calc(${base} + ${pull}px)`,
      transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    } as React.CSSProperties,
    handleProps: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onClick },
  };
}
