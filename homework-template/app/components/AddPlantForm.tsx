"use client";

import { useState } from "react";
import Input from "./Input";
import type { CreatePlantInput } from "../types/plants";

type Props = {
  onCreate: (input: CreatePlantInput) => Promise<void> | void;
  busy: boolean;
  onError?: (message: string | null) => void;
};

const initialForm: CreatePlantInput = {
  name: "",
  species: "",
  location: "",
};

export default function AddPlantForm({ onCreate, busy, onError }: Props) {
  const [form, setForm] = useState<CreatePlantInput>(initialForm);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.species.trim() || !form.location.trim()) {
      const message = "Please fill name, species, and location.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    setLocalError(null);
    onError?.(null);

    try {
      await onCreate({
        name: form.name.trim(),
        species: form.species.trim(),
        location: form.location.trim(),
      });
      setForm(initialForm);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to add plant";
      setLocalError(message);
      onError?.(message);
    }
  };

  return (
    <div className="rounded-3xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Add a plant</h2>
      <p className="text-sm text-slate-200">Name, species, and location are required. Status defaults to Healthy.</p>

      <div className="mt-4 flex flex-col gap-3">
        <Input
          label="Name"
          placeholder="Spike"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Input
          label="Species"
          placeholder="Snake Plant"
          value={form.species}
          onChange={(e) => setForm((prev) => ({ ...prev, species: e.target.value }))}
        />
        <Input
          label="Location"
          placeholder="Living Room"
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
        />
        <button
          onClick={handleSubmit}
          disabled={busy}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-200 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Create plant"}
        </button>
        {localError && <span className="text-xs text-amber-200">{localError}</span>}
      </div>

      <div className="mt-4 rounded-xl bg-white/5 p-4 text-xs text-slate-200 ring-1 ring-white/10">
        <p className="font-semibold text-white">How this page talks to your API</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>GET /api/plants with optional ?location= filter for the grid.</li>
          <li>POST /api/plants with name, species, location for creation.</li>
          <li>PATCH /api/plants/[id] for status or lastWatered tweaks.</li>
          <li>DELETE /api/plants/[id] to remove an entry.</li>
        </ul>
      </div>
    </div>
  );
}
