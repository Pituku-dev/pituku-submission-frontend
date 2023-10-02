import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useUserStore = create()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        role: "",
        user: {},
        authenticate: (val) => set((state) => ({ isAuthenticated: val })),
        setRole: (val) => set((state) => ({ role: val })),
        setUser: (val) => set((state) => ({ user: val })),
      }),
      {
        name: "userStore",
      }
    )
  )
);
