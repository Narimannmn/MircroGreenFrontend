import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const PlantTypeShema = z.object({
  created_at: z.coerce.date(),
  update_at: z.coerce.date(),
  id: IDSchema,
  name: z.string(),
  description: z.string(),
});
export type PlantType = z.infer<typeof PlantTypeShema>;

export const PlantTypeReadSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type PlantTypeRead = z.infer<typeof PlantTypeReadSchema>;
