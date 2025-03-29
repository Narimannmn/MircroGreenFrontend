import { z } from "zod";
import { PlantTypeReadSchema } from "@/entities/Plantype/shemas/shemas";
import { IDSchema } from "@/shared/schemas";

export const PlantSchema = z.object({
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  id: IDSchema,
  name: z.string(),
  description: z.string(),
  typical_days_to_harvestinteger: z.number(),
  plant_type: PlantTypeReadSchema,
});

export type Plant = z.infer<typeof PlantSchema>;

export const PlantReadSchema = z.object({
  name: z.string().min(1, "Plant name is required"),
  description: z.string().min(1, "Description is required"),
  typical_days_to_harvest: z.number(),
  plant_type: PlantTypeReadSchema,
});
export type PlantRead = z.infer<typeof PlantReadSchema>;

export const PlantReadCreateSchema = z.object({
  name: z.string().min(1, { message: "Plant name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  typical_days_to_harvest: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Typical Days to Harvest must be a valid number",
  }),
  plant_type_id: z.string().optional(),
});
export type PlantReadCreate = z.infer<typeof PlantReadCreateSchema>;
