import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import { useAuthStore } from "../store/useAuthStore";
import MovieCard from "../components/MovieCard";
import Genres from "../components/Genres";
import { useTvStoreApi } from "../tvApi/useTvStore";
import { motion } from "framer-motion";

function DiscoverPage() {
  const {
    getDiscoverMovies,
    discoverMovies,
    discoverCurrentPage,
    discoverTotalPages,
    getSearchMovie,
    searchMovies,
    searchCurrentPage,
    searchTotalPages,
    clearDiscoverMovies,
    getAllMovieGenre,
    genres,
  } = useMovieApi();
  const {
    getSearchTvSeries,
    searchTvSeries,
    searchCurrentPage: searchTvCurrentPage,
    searchTotalPages: searchTvTotalPages,
  } = useTvStoreApi();

  const { language } = useAuthStore();
  const [adult, setAdult] = useState(false);
  const [year, setYear] = useState("");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenres, setselectedGenres] = useState([]);
  const [isTVSeries, setIsTVSeries] = useState(false);

  // Decide which list to show
  const moviesToDisplay = useMemo(() => {
    if (isSearching) {
      return isTVSeries ? searchTvSeries : searchMovies;
    }
    return discoverMovies;
  }, [isSearching, isTVSeries, searchTvSeries, searchMovies, discoverMovies]);

  const currentPage = useMemo(() => {
    if (isSearching) {
      return isTVSeries ? searchTvCurrentPage : searchCurrentPage;
    }
    return discoverCurrentPage;
  }, [
    isSearching,
    isTVSeries,
    searchTvCurrentPage,
    searchCurrentPage,
    discoverCurrentPage,
  ]);

  const totalPages = useMemo(() => {
    if (isSearching) {
      return isTVSeries ? searchTvTotalPages : searchTotalPages;
    }
    return discoverTotalPages;
  }, [
    isSearching,
    isTVSeries,
    searchTvTotalPages,
    searchTotalPages,
    discoverTotalPages,
  ]);

  const hasMorePages = currentPage < totalPages;

  // Fetch Discover
  const fetchDiscover = useCallback(() => {
    setIsSearching(false);
    getDiscoverMovies({
      adult,
      language,
      year,
      selectedGenres,
      page: 1,
    });
  }, [adult, year, language, selectedGenres]);

  // Search Handler
  const handleSearch = () => {
    if (!query.trim()) return fetchDiscover(); // reset to discover

    clearDiscoverMovies();
    setIsSearching(true);

    if (isTVSeries) {
      getSearchTvSeries({
        query,
        adult,
        language,
        year,
        page: 1,
      });
    } else {
      getSearchMovie({
        query,
        adult,
        language,
        year,
        page: 1,
      });
    }
  };

  // Fetch genres + initial discover
  useEffect(() => {
    getAllMovieGenre({ language });
    fetchDiscover();
  }, [language]);

  // When filters update
  useEffect(() => {
    if (!isSearching) fetchDiscover();
  }, [adult, year, selectedGenres]);
  useEffect(() => {
    if (isSearching) {
      handleSearch();
    }
  }, [adult, year, isTVSeries]);

  // Load next page
  const handleSeeMore = () => {
    if (isSearching) {
      if (isTVSeries) {
        getSearchTvSeries({
          query,
          adult,
          language,
          year,
          page: searchCurrentPage + 1,
        });
      } else {
        getSearchMovie({
          query,
          adult,
          language,
          year,
          page: searchCurrentPage + 1,
        });
      }
    } else {
      getDiscoverMovies({
        adult,
        language,
        year,
        selectedGenres,
        page: discoverCurrentPage + 1,
      });
    }
  };

  return (
    <motion.div
      className="w-full text-white pb-20 px-5 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">
        {isSearching && query
          ? `Search Results for "${query}"`
          : "Discover Movies"}
      </h1>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <input
          type="search"
          placeholder="Search movies or tv series..."
          className="p-2 rounded-lg flex-1 text-white placeholder:text-gray-200 "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-red-600 px-4 rounded-lg cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-6 mb-6 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={adult}
            onChange={(e) => setAdult(e.target.checked)}
          />
          Adult
        </label>

        <select
          className="bg-gray-800 p-2 rounded-md"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All Years</option>
          {Array.from({ length: 30 }).map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* Genres */}
      {!isSearching ? (
        <Genres
          genres={genres}
          selectedGenres={selectedGenres}
          setselectedGenres={setselectedGenres}
        />
      ) : (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          <button
            className={`px-4 py-1 rounded-md text-sm border transition cursor-pointer
          ${
            isTVSeries
              ? " border-violet-500"
              : " border-gray-600 hover:bg-gray-700"
          }`}
            onClick={() => setIsTVSeries(true)}
          >
            TV Series
          </button>

          <button
            className={`px-4 py-1 rounded-md text-sm border transition cursor-pointer
          ${
            !isTVSeries
              ? " border-violet-500"
              : " border-gray-600 hover:bg-gray-700"
          }`}
            onClick={() => setIsTVSeries(false)}
          >
            Movies
          </button>
        </div>
      )}

      {/* Movie Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {moviesToDisplay?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            type={isTVSeries ? "tv" : "movie"}
          />
        ))}
      </motion.div>

      {/* Load More */}
      {hasMorePages && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-yellow-500 px-6 py-2 rounded-full text-black font-semibold cursor-pointer"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default DiscoverPage;
