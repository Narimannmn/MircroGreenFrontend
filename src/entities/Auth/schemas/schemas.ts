import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const LoginFormFieldsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginFormFields = z.infer<typeof LoginFormFieldsSchema>;

export const TokenSchema = z.string();
export type Token = z.infer<typeof TokenSchema>;

export const LoginResponseSchema = z.object({
  access_token: TokenSchema,
  refresh_token: TokenSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const DecodedTokenSchema = z.object({
  sub: IDSchema.describe("ID of User"),
  iat: z.number(),
  nbf: z.number(),
  jti: IDSchema,
  exp: z.number(),
  type: z.string(),
  fresh: z.boolean(),
  permissions: z.number().array(),
});
export type DecodedToken = z.infer<typeof DecodedTokenSchema>;
