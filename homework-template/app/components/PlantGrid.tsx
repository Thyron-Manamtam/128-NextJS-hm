"use client";

import PlantCard from "./PlantCard";
import type { Plant, PlantStatus } from "../types/plants";

type Props = {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  busyId: string | null;
  accentClass: string;
  onStatusChange: (id: string, status: PlantStatus) => void | Promise<void>;
  onWaterNow: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

export default function PlantGrid({
  plants,
  loading,
  error,
  locationFilter,
  onLocationChange,
  busyId,
  accentClass,
  onStatusChange,
  onWaterNow,
  onDelete,
}: Props) {
  const uniqueLocations = [...new Set(plants.map((p) => p.location))];

  return (
    <div className="rounded-3xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10 backdrop-blur lg:col-span-2">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm text-slate-200">Filter by location</label>
        <select
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
          className="rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <option value="*">All spaces</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {loading && <span className="text-xs text-emerald-200">Refreshing…</span>}
        {error && <span className="text-xs text-amber-200">{error}</span>}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            busy={busyId === plant.id}
            accentClass={accentClass}
            onStatusChange={onStatusChange}
            onWaterNow={(id) => onWaterNow(id)}
            onDelete={onDelete}
          />
        ))}

        {!loading && plants.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-200">
            No plants yet. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
