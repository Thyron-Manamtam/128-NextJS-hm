"use client";

import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, ...rest }: Props) {
  return (
    <label className="space-y-1 text-sm text-slate-200">
      <span className="block text-xs uppercase tracking-[0.2em] text-white/70">{label}</span>
      <input
        {...rest}
        className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-emerald-200 focus:outline-none"
      />
    </label>
  );
}
