import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const LotSchema = z.object({
  id: z.number(),
  plant_id: IDSchema,
  plant_name: z.string(),
  date_planted: z.coerce.date(),
  created_at: z.coerce.date(),
  type_of_soil: z.string(),
  soil_number: z.number().int(),
  date_harvested: z.coerce.date(),
  updated_at: z.string().nullable(),
});
export type Lot = z.infer<typeof LotSchema>;

export type PaginatedLot = {
  seedbeds: Lot[];
  page: number;
  page_size: number;
  page_count: number;
};

export const LotCreateReadSchema = z.object({
  plant_id: IDSchema,
  date_planted: z.coerce.date(),
  type_of_soil: z.string(),
  soil_number: z.number(),
  date_harvested: z.coerce.date().optional(),
});
export type LotCreateRead = z.infer<typeof LotCreateReadSchema>;

export const LotCreateSchema = z.object({
  plant_id: IDSchema,
  date_planted: z.coerce.date(),
  type_of_soil: z.string(),
  soil_number: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Typical Days to Harvest must be a valid number",
  }),
  date_harvested: z.coerce.date().optional(),
});
export type LotCreate = z.infer<typeof LotCreateSchema>;
