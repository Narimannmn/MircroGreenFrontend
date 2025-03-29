import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface SidebarState {
  collapsed: boolean;
}

export interface SidebarActions {
  toggle: () => void;
}

export const useSidebarStore = create<SidebarState & SidebarActions>()(
  devtools(
    immer((set) => ({
      collapsed: false,
      toggle: () => {
        set((state) => {
          state.collapsed = !state.collapsed;
        });
      },
    })),
  ),
);
