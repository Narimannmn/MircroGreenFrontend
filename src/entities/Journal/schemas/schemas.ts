import { z } from "zod";

export const RecordsBaseSchema = z.object({
  water_temperature: z.number(),
  air_temperature: z.number(),
  air_humidity: z.number(),
  light_level: z.number(),
  height_plant: z.number().optional(),
  photo_link: z.string().nullable().optional(),
});

export type RecordsBase = z.infer<typeof RecordsBaseSchema>;

export const RecordsResponseSchema = z.object({
  water_temperature: z.number(),
  air_temperature: z.number(),
  air_humidity: z.number(),
  light_level: z.number(),
  height_plant: z.number().optional(),
  photo_link: z.string().nullable().optional(),
  id: z.number(),
  created_at: z.coerce.date(),
  soilId: z.number(),
});

export type RecordsResponse = z.infer<typeof RecordsResponseSchema>;

export type PaginatedRecords = {
  records: RecordsResponse[];
  page: number;
  page_size: number;
  page_count: number;
};
