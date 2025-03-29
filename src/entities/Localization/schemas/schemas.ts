import { z } from "zod";

export const LocalizationSchema = z.object({
  name: z.string(),
  nameKZ: z.string().nullable(),
});
export type Localization = z.infer<typeof LocalizationSchema>;
