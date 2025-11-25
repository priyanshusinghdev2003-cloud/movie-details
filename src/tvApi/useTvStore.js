import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useTvStoreApi = create((set, get) => ({
  isLoading: false,
  popular: null,
  tvDetail: null,
  recommend: null,
  similar: null,
  credits: null,
  personTvCredits: null,

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

  getTvRecommendations: async ({ tvId, language }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/tv/${tvId}/recommendations?language=${language}`
      );
      set({ recommend: data.results });
    } catch (error) {
      console.log("error at fetching tv recommendations: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getTvSimilar: async ({ tvId, language }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/tv/${tvId}/similar?language=${language}`
      );
      set({ similar: data.results });
    } catch (error) {
      console.log("error at fetching tv similar: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getTvCredits: async ({ tvId, language }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/tv/${tvId}/credits?language=${language}`
      );
      set({ credits: data });
    } catch (error) {
      console.log("error at fetching tv credits: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getPersonTvCredits: async ({ personId, language }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/person/${personId}/tv_credits?language=${language}`
      );
      set({ personTvCredits: data });
    } catch (error) {
      console.log("error at fetching person tv credits: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
