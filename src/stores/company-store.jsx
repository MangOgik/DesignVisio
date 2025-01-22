import { create } from "zustand";
import { getData } from "@/utils/api";

const useCompanyStore = create((set, get) => ({
  companies: [],
  selectedCompany: null,

  fetchCompanies: async () => {
    try {
      const response = await getData("/api/v1/company/read");
      if (response) {
        set({ companies: response.datas });
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  },

  fetchCompanyBySlug: async (slug) => {
    try {
      if (get().companies.length === 0) {
        await get().fetchCompanies();
      }
      const existingCompany = get().companies.find((company) => {
        const encodedName = encodeURIComponent(
          company.name
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
        );
        return encodedName === slug;
      });

      if (existingCompany) {
        set({ selectedCompany: existingCompany });
        return existingCompany;
      }

      return null;
    } catch (error) {
      console.error("Error fetching company:", error);
      return null;
    }
  },

  setSelectedCompany: (company) => {
    set({ selectedCompany: company });
    console.log("company set to : ", company);
  },

  reset: () =>
    set({
      companies: [],
      selectedCompany: null,
    }),
}));

export default useCompanyStore;
