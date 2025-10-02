import React from "react";

interface BadgeProps {
    label: string;
    color: "green" | "red" | "yellow" | "gray";
    variant?: "verification" | "status";
}

const colorMap = {
    green: {
        border: "border-[#1bb36a]",
        bg: "bg-[#0d1e16]",
        text: "text-[#1bb36a]",
        icon: "text-[#1bb36a]"
    },
    red: {
        border: "border-[#d32f2f]",
        bg: "bg-[#2a1818]",
        text: "text-[#d32f2f]",
        icon: "text-[#d32f2f]"
    },
    yellow: {
        border: "border-[#eab308]",
        bg: "bg-[#23200f]",
        text: "text-[#eab308]",
        icon: "text-[#eab308]"
    },
    gray: {
        border: "border-[#4b5563]",
        bg: "bg-[#181a20]",
        text: "text-[#a1a1aa]",
        icon: "text-[#a1a1aa]"
    }
};

export default function Badge({ label, color, variant = "status" }: BadgeProps) {
    const styles = colorMap[color];
    if (variant === "verification") {
        // Exact style as image: thin border, small dot, tight padding, lighter bg, font
        let dotColor = "bg-[#1bb36a]";
        let borderColor = "border-[#1bb36a]";
        let textColor = "text-[#1bb36a]";
        let bgColor = "bg-[#101a16]";
        if (color === "red") {
            dotColor = "bg-[#d32f2f]";
            borderColor = "border-[#d32f2f]";
            textColor = "text-[#d32f2f]";
            bgColor = "bg-[#1a1416]";
        } else if (color === "yellow") {
            dotColor = "bg-[#eab308]";
            borderColor = "border-[#eab308]";
            textColor = "text-[#eab308]";
            bgColor = "bg-[#18160f]";
        }
        return (
            <span
                className={`inline-flex items-center gap-[6px] px-[16px] py-[5px] rounded-full border border-[1px] text-[15px] font-medium ${bgColor} ${borderColor} ${textColor}`}
                style={{ minWidth: 90 }}
            >
                <span className={`w-[8px] h-[8px] rounded-full ${dotColor}`}></span>
                <span className="leading-none" style={{ paddingTop: 1 }}>{label}</span>
            </span>
        );
    }
    // Status badge style (default)
    let icon = null;
    if (color === "green") {
        icon = (
            <svg className={`w-[18px] h-[18px] ${styles.icon}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    } else if (color === "red") {
        icon = (
            <svg className={`w-[18px] h-[18px] ${styles.icon}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" />
                <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    } else if (color === "yellow") {
        icon = (
            <svg className={`w-[18px] h-[18px] ${styles.icon}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" />
                <path d="M12 8v4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
        );
    } else if (color === "gray") {
        icon = (
            <svg className={`w-[18px] h-[18px] ${styles.icon}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" />
                <path d="M8 12h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    return (
        <span
            className={`inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[999px] border-[1.5px] text-[15px] font-semibold ${styles.bg} ${styles.border} ${styles.text}`}
            style={{ minWidth: 90 }}
        >
            {icon}
            <span className="leading-none" style={{ paddingTop: 1 }}>{label}</span>
        </span>
    );
}
