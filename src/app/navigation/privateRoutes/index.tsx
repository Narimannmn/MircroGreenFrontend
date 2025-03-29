import { Outlet, RouteObject } from "react-router-dom";
import { AnalyticsPageLazy } from "@/pages/analytics";
import { LotsPageLazy } from "@/pages/lots";
import { PlantsPageLazy } from "@/pages/plants";
import { AppSuspense } from "@/shared/components/AppSuspense";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/shared/layouts/AppLayout/AppLayout";
import { privateRoutesMap } from "@/shared/navigation";

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <AppLayout>
          <AppSuspense>
            <Outlet />
          </AppSuspense>
        </AppLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: privateRoutesMap.plants,
        element: <PlantsPageLazy />,
      },
      {
        path: privateRoutesMap.analytics,
        element: <AnalyticsPageLazy />,
      },
      {
        path: privateRoutesMap.lots,
        element: <LotsPageLazy />,
      },
    ],
  },
];
