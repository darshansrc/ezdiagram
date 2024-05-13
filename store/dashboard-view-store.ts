import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface dashboardViewStore {
  dashboardType: "grid" | "list";
  changeDashboardType: (type: "grid" | "list") => void;
}

const useDashboardView = create<dashboardViewStore>()(
  persist(
    (set) => ({
      dashboardType: "grid",
      changeDashboardType: (type) => set({ dashboardType: type }),
    }),
    {
      name: "dashboard-view",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDashboardView;
