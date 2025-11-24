import React, { useEffect, useState } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import { useTvStoreApi } from "../tvApi/useTvStore";
import MovieCard from "./MovieCard";
import ShimmerCard from "./ShimmerCard";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

function Popular() {
  const { popularMovie, getPopularMovie, isLoading } = useMovieApi();
  const { popular: popularTv, getPopularTvSeries, isLoading: isLoadingTv } = useTvStoreApi();

  const [popularOn, setPopularOn] = useState("movie");
  const [popular, setPopular] = useState(null);

  const { language } = useAuthStore();

  useEffect(() => {
    if (!language) return;

    if (popularOn === "movie") {
      if (!popularMovie || popularMovie.length === 0) {
        getPopularMovie({ language });
      } else {
        setPopular(popularMovie);
      }
    } else {
      if (!popularTv || popularTv.length === 0) {
        getPopularTvSeries({ language });
      } else {
        setPopular(popularTv);
      }
    }
  }, [popularOn, language]);

  useEffect(() => {
    if (popularOn === "movie") setPopular(popularMovie);
    else setPopular(popularTv);
  }, [popularMovie, popularTv, popularOn]);

  const showLoading = popularOn === "movie" ? isLoading : isLoadingTv;

  return (
    <div className="py-2 px-5">
      {/* HEADER */}
      <div className="flex items-center gap-3 h-24">
        <h1 className="text-2xl font-bold">What's Popular</h1>
        <div className="p-1 border border-gray-300 rounded-2xl flex text-sm gap-1">
          {["movie", "tv"].map((t) => (
            <span
              key={t}
              onClick={() => setPopularOn(t)}
              className={`px-3 py-1 rounded-2xl cursor-pointer transition-all ${
                popularOn === t
                  ? "bg-[#032541] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t === "movie" ? "Movie" : "TV"}
            </span>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 pb-3">
        {showLoading || !popular
          ? [...Array(8)].map((_, i) => <ShimmerCard key={i} />)
          : popular.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} lazy type={popularOn} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}

export default Popular;
