import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePersonApi = create((set, get) => ({
  popularPerson: null,
  isLoading: false,

  getPopularPerson: async ({ language }) => {
    const savedPopularPerson = get().popularPerson;
    if (savedPopularPerson) return;
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/person/popular?language=${language}&page=1`
      );
      set({ popularPerson: data?.results });
    } catch (error) {
      console.log("Error at fetching popular Person: ", error);
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
