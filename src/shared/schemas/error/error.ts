import { z } from "zod";

export const PydanticErrorSchema = z.object({
  detail: z.array(
    z.object({
      loc: z.string().or(z.number()).array(),
      msg: z.string(),
      type: z.string(),
    }),
  ),
});
export type PydanticError = z.infer<typeof PydanticErrorSchema>;

export const BackendCustomErrorSchema = z.object({
  detail: z.string(),
});
export type BackendCustomErrorSchema = z.infer<typeof BackendCustomErrorSchema>;
