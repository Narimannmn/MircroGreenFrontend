import { lazy } from "react";

export const TelegramPageLazy = lazy(() =>
  import("./TelegramPage").then(({ TelegramPage }) => ({
    default: TelegramPage,
  })),
);
