import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMovieApi = create((set, get) => ({
  featuredMovie: null,
  trendingMovie: null,
  recommendingMovies: null,
  similarMovies: null,
  movieDetail: null,

  getFeaturedMovie: async ({ region, language }) => {
    const savedFeaturedMovie = get().featuredMovie;
    if (savedFeaturedMovie) return;

    try {
      const { data } = await axiosInstance.get(
        `/movie/popular?language=${language}&limit=5&region=${region}`
      );

      set({ featuredMovie: data?.results?.slice(0,5) });
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    }
  },
}));
