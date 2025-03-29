import { lazy } from "react";

export const AnalyticsPageLazy = lazy(() =>
  import("./AnalyticsPage").then(({ AnalyticsPage }) => ({
    default: AnalyticsPage,
  })),
);
