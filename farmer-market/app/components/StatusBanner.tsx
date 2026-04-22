"use client";

import { useState } from "react";

type StatusBannerProps = {
  message: string;
  variant?: "success" | "error";
};

const variantStyles = {
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-900",
    button:
      "text-emerald-700 transition hover:bg-emerald-100 hover:text-emerald-900",
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-900",
    button: "text-red-700 transition hover:bg-red-100 hover:text-red-900",
  },
} as const;

export default function StatusBanner({
  message,
  variant = "success",
}: StatusBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`flex items-start justify-between gap-3 rounded-[1.5rem] border px-4 py-3 text-sm shadow-sm sm:px-5 ${variantStyles[variant].container}`}
    >
      <p className="leading-6">{message}</p>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant].button}`}
      >
        Close
      </button>
    </div>
  );
}
