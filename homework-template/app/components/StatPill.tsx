"use client";

type Tone = "sky" | "emerald" | "amber";

type Props = {
  label: string;
  value: number;
  tone?: Tone;
};

const toneMap: Record<Tone, string> = {
  sky: "bg-sky-300/30 text-sky-100 ring-sky-200/50",
  emerald: "bg-emerald-300/30 text-emerald-100 ring-emerald-200/50",
  amber: "bg-amber-300/30 text-amber-50 ring-amber-200/50",
};

export default function StatPill({ label, value, tone = "sky" }: Props) {
  return (
    <div className={`rounded-full px-4 py-2 text-xs font-semibold ring-1 ${toneMap[tone]}`}>
      <span className="uppercase tracking-[0.2em]">{label}</span>
      <span className="ml-2 text-base">{value}</span>
    </div>
  );
}
