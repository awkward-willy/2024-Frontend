import { create } from "zustand";

type RerenderStore = {
  rerender: boolean;
  toggleRerender: () => void;
};

export const useRerenderStore = create<RerenderStore>((set) => ({
  rerender: false,
  toggleRerender: () => set((state) => ({ rerender: !state.rerender })),
}));
