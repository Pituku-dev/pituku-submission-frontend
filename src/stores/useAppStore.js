import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAppStore = create()(
  devtools(
    persist(
      (set, get) => ({
        theme: "dark",
        changeTheme: (val) => set((state) => ({ theme: val })),
        currentMenu: "dashboard",
        setCurrentMenu: (val) => set((state) => ({ currentMenu: val })),
      }),
      {
        name: "appStore",
      }
    )
  )
);
