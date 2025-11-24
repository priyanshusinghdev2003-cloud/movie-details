import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMovieApi = create((set, get) => ({
  featuredMovie: null,
  trendingMovie: null,
  recommendingMovies: null,
  similarMovies: null,
  movieDetail: null,
  popularMovie: null,
  upcomingMovie: null,
  isLoading: false,
  trendingCache: {
    day: null,
    week: null,
  },
 discoverMovies: [],
  discoverCurrentPage: 1,
  discoverTotalPages: 1,
  searchMovies: [],
  searchCurrentPage: 1,
  searchTotalPages: 1,
  genres: null,
  watchProvider: null,

  getFeaturedMovie: async ({ region, language }) => {
    const savedFeaturedMovie = get().featuredMovie;
    if (savedFeaturedMovie) return;

    try {
      const { data } = await axiosInstance.get(
        `/movie/popular?language=${language}&limit=5&region=${region}`
      );

      set({ featuredMovie: data?.results?.slice(0, 5) });
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    }
  },

  getUpComingMovie: async ({ language }) => {
    const savedUpcomingMovie = get().upcomingMovie;
    if (savedUpcomingMovie) return;
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/movie/upcoming?language=${language}&page=1`
      );
      set({ upcomingMovie: data?.results });
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    } finally {
      set({ isLoading: false });
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
      const { data } = await axiosInstance.get(`trending/movie/${time_window}`);

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

  getMovieDetail: async ({ movieId, language }) => {
    try {
      const { data } = await axiosInstance.get(
        `/movie/${movieId}?language=${language}`
      );
      return data;
    } catch (error) {
      console.log("Eroor at Fetching Movie Detail: ", error);
    }
  },
  getMovieRecommendation: async ({ movieId }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/movie/${movieId}/recommendations`
      );
      set({ recommendingMovies: data?.results });
    } catch (error) {
      console.log("Eror at Fetching Movie Detail: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getMovieCredits: async ({ movieId, language }) => {
    try {
      const { data } = await axiosInstance.get(
        `/movie/${movieId}/credits?language=${language}`
      );
      return data;
    } catch (error) {
      console.log("Eror at Fetching Movie Detail: ", error);
    }
  },

  getMOvieTRailer: async ({ movieId, language }) => {
    try {
      const { data } = await axiosInstance.get(
        `/movie/${movieId}/videos?language=${language}`
      );
      return data;
    } catch (error) {
      console.log("Error at fetching Movie Trailer: ", error);
    }
  },

  getPopularMovie: async ({ language }) => {
    const savedPopularMovie = get().popularMovie;
    if (savedPopularMovie) return;
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/movie/popular?language=${language}&page=1`
      );
      set({ popularMovie: data?.results });
    } catch (error) {
      console.log("Error at fetching popular movie: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getSimilarMovie: async ({ movieID }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance(`/movie/${movieID}/similar`);
      set({ similarMovies: data?.results });
    } catch (error) {
      console.log("Error at fetching Simialr movie: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getDiscoverMovies: async ({ adult = false, language, year, selectedGenres = [], page = 1 }) => {
  try {
    const params = new URLSearchParams({
      include_adult: adult,
      include_video: false,
      language,
      page,
      sort_by: "popularity.desc"
    });

    if (year) params.append("primary_release_year", year);
    if (selectedGenres.length > 0) params.append("with_genres", selectedGenres.join(","));

    const { data } = await axiosInstance.get(`/discover/movie?${params.toString()}`);

    set((state) => ({
      discoverMovies:
        page === 1 ? data.results : [...state.discoverMovies, ...data.results],
      discoverCurrentPage: data.page,
      discoverTotalPages: data.total_pages,
    }));
  } catch (error) {
    console.log("Error fetching Discover Movies:", error);
  }
},


getSearchMovie: async ({ query, adult = false, language, year, page = 1 }) => {
  try {
    const params = new URLSearchParams({
      query,
      include_adult: adult,
      language,
      page,
    });

    if (year) params.append("year", year);

    const { data } = await axiosInstance.get(`/search/movie?${params.toString()}`);

    set((state) => ({
      searchMovies:
        page === 1 ? data.results : [...state.searchMovies, ...data.results],
      searchCurrentPage: data.page,
      searchTotalPages: data.total_pages,
    }));
  } catch (error) {
    console.log("Error fetching Search:", error);
  }
},

// Add a new utility function to clear discover data
clearDiscoverMovies: () => set({ 
    discoverMovies: [],
    discoverCurrentPage: 1,
    discoverTotalPages: 1,
}),

getAllMovieGenre: async({language})=>{
  try {
    const {data}=await axiosInstance.get(`/genre/movie/list?language=${language}`)
    set({genres: data?.genres})
  } catch (error) {
    console.log("Error at Fetching Genres: ",error)
  }
},

getWatchProvider: async({movieId})=>{
  set({isLoading: true})
  try {
    const {data}=await axiosInstance.get(`/movie/${movieId}/watch/providers`)
    set({watchProvider: data?.results})
  } catch (error) {
    console.log("Error at Fetching Providers: ",error)
  }
}
}));
