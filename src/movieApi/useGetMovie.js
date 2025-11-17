import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMovieApi = create((set, get) => ({
  featuredMovie: null,
  trendingMovie: null,
  recommendingMovies: null,
  similarMovies: null,
  movieDetail: null,
  upcomingMovie: null,
  isLoading: false,
  trendingCache: {
    day: null,
    week: null,
  },

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
  },
  

  getTrendingMovie: async ({ time_window }) => {
    const { trendingCache } = get();
    if (trendingCache[time_window]) {
      set({ trendingMovie: trendingCache[time_window] });
      return; 
    }
    set({ isLoading: true });

    try {
      const { data } = await axiosInstance.get(
        `trending/movie/${time_window}`
      );

     
      set((state) => ({
        trendingMovie: data.results,
        trendingCache: {
          ...state.trendingCache,
          [time_window]: data.results,
        },
      }));
    } catch (error) {
      console.error("Error fetching trending movie:", error);
    } finally {
      set({ isLoading: false });
    }
  },


  getMovieDetail: async({movieId,language})=>{
    try {
      const {data}=await axiosInstance.get(`/movie/${movieId}?language=${language}`)
      return data;
    } catch (error) {
      console.log("Eroor at Fetching Movie Detail: ",error)
    }
  },
  getMovieRecommendation: async({movieId})=>{
    try {
      const {data}=await axiosInstance.get(`/movie/${movieId}/recommendations`)
      return data;
    } catch (error) {
      console.log("Eror at Fetching Movie Detail: ",error)
    }
  },
  getMovieCredits: async({movieId,language})=>{
    try {
      const {data}=await axiosInstance.get(`/movie/${movieId}/credits?language=${language}`)
      return data;
    } catch (error) {
      console.log("Eror at Fetching Movie Detail: ",error)
    }
  },

  getMOvieTRailer: async({movieId,language})=>{
    try {
      const {data} = await axiosInstance.get(`/movie/${movieId}/videos?language=${language}`)
      return data
    } catch (error) {
      console.log("Error at fetching Movie Trailer: ",error)
    }
  },

}));
