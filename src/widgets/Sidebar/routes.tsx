import { ReactElement } from "react";
import { FaTelegram } from "react-icons/fa";
import { GiHighGrass } from "react-icons/gi";
import { PiPottedPlantDuotone } from "react-icons/pi";
import { privateRoutesMap } from "@/shared/navigation";

type SidebarItem = {
  key: string;
  type: "item";
  label: string;
  icon: ReactElement;
};

type SidebarGroup = {
  key: string;
  type: "group";
  label: string;
  children: SidebarItem[];
};
export const sidebarItems: SidebarGroup[] = [
  {
    key: "main",
    type: "group",
    label: "Основные",
    children: [
      {
        key: privateRoutesMap.lots,
        type: "item",
        label: "Лоты",
        icon: <GiHighGrass />,
      },
      {
        key: privateRoutesMap.plants,
        type: "item",
        label: "Микрозелени",
        icon: <PiPottedPlantDuotone />,
      },
    ],
  },
  {
    key: "integration",
    type: "group",
    label: "Пуш-уведомления",
    children: [
      {
        key: "/telegram",
        type: "item",
        label: "Телеграмм",
        icon: <FaTelegram />,
      },
    ],
  },
];

export const collapsedSidebarItems: SidebarItem[] = sidebarItems.flatMap(
  (group) => (group.type === "group" ? group.children : []),
);
