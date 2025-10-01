import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type Props = {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number | "anchor";
};

export default function DropdownPortal({
  anchorRef,
  open,
  children,
  align = "left",
  width = "anchor",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = anchorRef?.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const left =
      align === "left"
        ? rect.left + window.scrollX
        : rect.right + window.scrollX;
    const top = rect.bottom + window.scrollY;
    const resolvedWidth =
      width === "anchor"
        ? rect.width
        : typeof width === "number"
        ? width
        : undefined;
    setStyle({
      position: "absolute",
      top,
      left: align === "left" ? left : undefined,
      right: align === "right" ? window.innerWidth - left : undefined,
      width: resolvedWidth,
      zIndex: 9999,
    });
  }, [open, anchorRef, align, width]);

  if (!mounted) return null;
  if (!open) return null;
  const container = document.body;
  return ReactDOM.createPortal(
    <div style={style} className="z-50">
      {children}
    </div>,
    container
  );
}
