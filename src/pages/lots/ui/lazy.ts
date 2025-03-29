import { lazy } from "react";

export const LotsPageLazy = lazy(() =>
  import("./LotsPage").then(({ LotsPage }) => ({ default: LotsPage })),
);
