"use client";

import type { Plant, PlantStatus } from "../types/plants";
import { STATUS_OPTIONS } from "../types/plants";

type Props = {
  plant: Plant;
  busy: boolean;
  accentClass: string;
  onStatusChange: (id: string, status: PlantStatus) => void | Promise<void>;
  onWaterNow: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

export default function PlantCard({
  plant,
  busy,
  accentClass,
  onStatusChange,
  onWaterNow,
  onDelete,
}: Props) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-slate-900/80 p-[1px] shadow-xl ring-1 ring-white/10">
      <div className={`h-full rounded-2xl bg-gradient-to-br ${accentClass} p-4 text-slate-900 shadow-inner`}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-sm font-semibold text-emerald-200 ring-1 ring-slate-900/60">
            {plant.name[0]?.toUpperCase() ?? ""}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{plant.name}</h3>
            <p className="text-sm text-slate-700">{plant.species}</p>
          </div>
          <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-slate-900">
            {plant.location}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white ring-1 ring-slate-900/60">
            {plant.status}
          </span>
          <span className="text-xs text-slate-700">
            Last watered {new Date(plant.lastWatered).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select
            value={plant.status}
            onChange={(e) => onStatusChange(plant.id, e.target.value as PlantStatus)}
            className="rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            disabled={busy}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              onWaterNow(plant.id)
            }
            disabled={busy}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-slate-800 disabled:opacity-60"
          >
            Mark watered now
          </button>
          <button
            onClick={() => onDelete(plant.id)}
            disabled={busy}
            className="ml-auto rounded-full bg-white/60 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-white disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
