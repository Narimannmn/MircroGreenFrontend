export const namespaces = ["login", "requests", "apiResponseStatuses"] as const;
export type AppI18NextNamespace = (typeof namespaces)[number];
