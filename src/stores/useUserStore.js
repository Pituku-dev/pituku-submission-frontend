import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useUserStore = create()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        role: "",
        authenticate: (val) => set((state) => ({ isAuthenticated: val })),
        setRole: (val) => set((state) => ({ role: val })),
      }),
      {
        name: "userStore",
      }
    )
  )
);
