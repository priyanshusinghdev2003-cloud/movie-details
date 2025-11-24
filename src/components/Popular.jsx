import React, { useEffect, useState } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
import ShimmerCard from "./ShimmerCard"
import { useAuthStore } from "../store/useAuthStore";

function Popular() {

  const { popularMovie, getPopularMovie, isLoading } = useMovieApi();
  const {language} = useAuthStore()
  useEffect(() => {
    if(language){
      getPopularMovie({ language });
    }
  }, [language]);
  return (
    <div className="py-2 px-5">
      {/* HEADER */}
      <div className="flex items-center gap-3 h-24">
        <h1 className="text-2xl font-bold">What's Popular</h1>
      </div>

      {/* MOVIE LIST */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 pb-3">
        {isLoading
          ? [...Array(8)].map((_, i) => <ShimmerCard key={i} />)
          : popularMovie?.map((movie, index) => (
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
export default Popular;
