import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMovieApi = create((set, get) => ({
  featuredMovie: null,
  trendingMovie: null,
  recommendingMovies: null,
  similarMovies: null,
  movieDetail: null,
  upcomingMovie: null,

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


  getUpComingMovie : async({language})=>{
    const savedUpcomingMovie =get().upcomingMovie;
    if(savedUpcomingMovie) return
    try {
      const {data} = await axiosInstance.get(`/movie/upcoming?language=${language}&page=1`)
       set({ upcomingMovie: data?.results });
    } catch (error) {
       console.error("Error fetching featured movie:", error);
    }
  }
}));
