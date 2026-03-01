"use client";

import AddPlantForm from "./AddPlantForm";
import PlantGrid from "./PlantGrid";
import StatPill from "./StatPill";
import { usePlants } from "../hooks/usePlants";
import type { PlantStatus } from "../types/plants";

const accent = "from-emerald-200/80 via-sky-100 to-white";

export default function PlantDashboard() {
  const {
    plants,
    loading,
    error,
    setError,
    locationFilter,
    setLocationFilter,
    busyId,
    summary,
    createPlant,
    updatePlant,
    deletePlant,
  } = usePlants();

  const handleStatusChange = async (id: string, status: PlantStatus) => {
    await updatePlant(id, { status });
  };

  const handleWaterNow = async (id: string) => {
    await updatePlant(id, { status: "Healthy", lastWatered: new Date().toISOString() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-14 sm:px-10">
        <header className="flex flex-col gap-3 rounded-3xl bg-white/5 p-7 shadow-lg ring-1 ring-white/10 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Plant Care Tracker</p>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Your indoor jungle, organized</h1>
              <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
                Monitor watering, tweak statuses, and keep every leaf happy. The UI talks directly to the /api/plants endpoints you implement.
              </p>
            </div>
            <div className="ml-auto flex gap-4">
              <StatPill label="Total" value={summary.total} />
              <StatPill label="Healthy" value={summary.healthy} tone="emerald" />
              <StatPill label="Thirsty" value={summary.thirsty} tone="amber" />
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <PlantGrid
            plants={plants}
            loading={loading}
            error={error}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            busyId={busyId}
            accentClass={accent}
            onStatusChange={handleStatusChange}
            onWaterNow={handleWaterNow}
            onDelete={deletePlant}
          />

          <AddPlantForm onCreate={createPlant} busy={busyId === "new"} onError={setError} />
        </section>
      </main>
    </div>
  );
}
