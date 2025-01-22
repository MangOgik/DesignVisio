import { getData } from "@/utils/api";
import { create } from "zustand";

const useArchitectStore = create((set, get) => ({
  architects: [],
  selectedArchitect: null,

  fetchArchitects: async () => {
    try {
      const response = await getData("/api/v1/architect/read");
      if (response) {
        set({ architects: response.datas });
      }
    } catch (error) {
      console.error("Error fetching architects:", error);
    }
  },

  fetchArchitectBySlug: async (slug) => {
    try {
      if (get().architects.length === 0) {
        await get().fetchArchitects();
      }
      const existingArchitect = get().architects.find((architect) => {
        const encodedName = encodeURIComponent(
          architect.name
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
        );
        return encodedName === slug;
      });

      if (existingArchitect) {
        set({ selectedArchitect: existingArchitect });
        return existingArchitect;
      }

      return null;
    } catch (error) {
      console.error("Error fetching architect:", error);
      return null;
    }
  },

  setSelectedArchitect: (architect) => {
    set({ selectedArchitect: architect });
  },

  reset: () =>
    set({
      architects: [],
      selectedArchitect: null,
    }),
}));

export default useArchitectStore;
