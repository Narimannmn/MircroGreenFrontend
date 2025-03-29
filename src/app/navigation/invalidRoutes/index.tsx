import { Navigate, RouteObject } from "react-router-dom";
import { invalidRoutesMap, publicRoutesMap } from "@/shared/navigation";

export const invalidRoutes: RouteObject[] = [
  {
    path: invalidRoutesMap.initial,
    element: (
      <Navigate
        to={publicRoutesMap.auth}
        replace
      />
    ),
  },
  {
    path: invalidRoutesMap.all,
    element: (
      <Navigate
        to={publicRoutesMap.auth}
        replace
      />
    ),
  },
];
