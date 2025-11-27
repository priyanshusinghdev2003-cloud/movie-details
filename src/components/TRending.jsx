import React, { useEffect, useState } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
import ShimmerCard from "./ShimmerCard";
function Trending() {
  const [trendingOn, setTrendingOn] = useState("day");
  const { getTrendingMovie, trendingMovie, isLoading } = useMovieApi();

  useEffect(() => {
    getTrendingMovie({ time_window: trendingOn });
  }, [trendingOn]);
  return (
    <div className="py-2 px-5">
      {/* HEADER */}
      <div className="flex items-center gap-3 h-24">
        <h1 className="text-2xl font-bold">Trending</h1>

        <div className="p-1 border border-gray-300 rounded-2xl flex text-sm gap-1">
          {["day", "week"].map((t) => (
            <span
              key={t}
              onClick={() => setTrendingOn(t)}
              className={`px-3 py-1 rounded-2xl cursor-pointer transition-all ${
                trendingOn === t
                  ? "bg-[#032541] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t === "day" ? "Today" : "This Week"}
            </span>
          ))}
        </div>
      </div>

      {/* MOVIE LIST */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 pb-3">
        {isLoading
          ? [...Array(8)].map((_, i) => <ShimmerCard key={i} />)
          : trendingMovie?.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} lazy />
              </motion.div>
            ))}
      </div>
    </div>
  );
}
export default Trending;
