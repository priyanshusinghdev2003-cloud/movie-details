import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import { useAuthStore } from "../store/useAuthStore";
import MovieCard from "../components/MovieCard";
import Genres from "../components/Genres";

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

  const { language } = useAuthStore();
  const [adult, setAdult] = useState(false);
  const [year, setYear] = useState("");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenres, setselectedGenres] = useState([]);

  // Decide which list to show
  const moviesToDisplay = isSearching ? searchMovies : discoverMovies;
  const currentPage = isSearching ? searchCurrentPage : discoverCurrentPage;
  const totalPages = isSearching ? searchTotalPages : discoverTotalPages;
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

    getSearchMovie({
      query,
      adult,
      language,
      year,
      page: 1,
    });
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
  useEffect(()=>{
    if(isSearching){
      handleSearch()
    }
  },[adult,year])

  // Load next page
  const handleSeeMore = () => {
    if (isSearching) {
      getSearchMovie({
        query,
        adult,
        language,
        year,
        page: searchCurrentPage + 1,
      });
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
    <div className="w-full text-white pb-20 px-5 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        {isSearching && query
          ? `Search Results for "${query}"`
          : "Discover Movies"}
      </h1>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <input
          type="search"
          placeholder="Search movies..."
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
      {!isSearching && <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        setselectedGenres={setselectedGenres}
      />}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {moviesToDisplay?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Load More */}
      {hasMorePages && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-yellow-500 px-6 py-2 rounded-full text-black font-semibold"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}

export default DiscoverPage;
