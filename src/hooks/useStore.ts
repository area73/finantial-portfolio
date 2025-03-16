import { create } from "zustand";
import type { ViewType } from "../types/portfolio";

type Store = {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
};

export const useStore = create<Store>((_set) => ({
  viewType: "asset",
  setViewType: (viewType: ViewType) => _set({ viewType }),
}));
