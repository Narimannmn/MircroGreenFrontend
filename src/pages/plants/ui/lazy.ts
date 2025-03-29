import { lazy } from "react";

export const PlantsPageLazy = lazy(() =>
  import("./PlantsPage").then(({ PlantsPage }) => ({ default: PlantsPage })),
);
