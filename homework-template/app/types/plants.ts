export type PlantStatus = "Healthy" | "Thirsty" | "Overwatered";

export interface Plant {
  id: string;
  name: string;
  species: string;
  location: string;
  lastWatered: string;
  status: PlantStatus;
}

export type CreatePlantInput = Pick<Plant, "name" | "species" | "location">;

export const STATUS_OPTIONS: PlantStatus[] = ["Healthy", "Thirsty", "Overwatered"];
