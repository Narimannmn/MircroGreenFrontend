import { z } from "zod";

export const PaginationSchema = <T extends object = Record<string, never>>(
  additionalSchema: T = {} as T,
) =>
  z.object({
    name: z.string().optional(),
    page: z.number().optional().default(1),
    page_size: z.number().optional().default(10),
    ...additionalSchema,
  });

export type BasePagination = {
  page: number;
  page_size: number;
};

export type ExtendedPagination = z.infer<
  ReturnType<typeof PaginationSchema<{ air: z.ZodString; temp: z.ZodNumber }>>
>;

export type PaginatedItem<T> = {
  page_count: number;
  items: T[];
};

export const EmptyPagination: PaginatedItem<unknown> = {
  page_count: 1,
  items: [],
};
