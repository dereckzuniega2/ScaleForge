import React from "react";

type Variant =
  | "all"
  | "verified"
  | "unverified"
  | "pending"
  | "active"
  | "blacklisted"
  | "disabled";

type Props = {
  variant: Variant;
  children?: React.ReactNode;
  size?: "sm" | "md";
};

export default function Badge({ variant, children, size = "md" }: Props) {
  const sizeClass = size === "sm" ? "text-xs" : "text-sm";
  const label = children ?? {
    all: "All Statuses",
    verified: "Verified",
    unverified: "Unverified",
    pending: "Pending",
    active: "Active",
    blacklisted: "Blacklisted",
    disabled: "Disabled",
  }[variant];

  return (
    <span className={`badge badge-${variant} ${sizeClass} inline-flex items-center gap-2`}>
      <span className="w-2 h-2 rounded-full bg-current inline-block" aria-hidden />
      <span>{label}</span>
    </span>
  );
}
