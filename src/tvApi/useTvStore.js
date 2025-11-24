import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useTvStoreApi = create((set, get) => ({
  isLoading: false,
  popular: null,
  tvDetail: null,

  getPopularTvSeries: async ({ language }) => {
    const { popular } = get();
    if (popular) {
      return;
    }
    set({ isLoading: true });

    try {
      const { data } = await axiosInstance.get(
        `/tv/popular?language=${language}`
      );
      set({ popular: data.results });
    } catch (error) {
      console.log("error at fetching popular tv series: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getTvSeriesdetail: async ({ tvId, language }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/tv/${tvId}?language=${language}`
      );
      set({ tvDetail: data });
    } catch (error) {
      console.log("error at fetching tv series detail: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getTvtrailer: async ({ tvId, language }) => {
    try {
      const { data } = await axiosInstance.get(
        `/tv/${tvId}/videos?language=${language}`
      );
      return data;
    } catch (error) {
      console.log("error at fetching tv trailers: ", error);
    }
  },
}));
