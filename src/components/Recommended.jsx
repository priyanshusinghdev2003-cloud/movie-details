import React from "react";
import ShimmerCard from "./ShimmerCard";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

function Recommended({ recommend, isLoading, type = "movie" }) {
  if (recommend.length < 1) return;
  return (
    <div className="py-2 px-5">
      {/* HEADER */}
      <div className="flex items-center gap-3 h-24">
        <h1 className="text-2xl font-bold">Recommendation For You</h1>
      </div>

      {/* MOVIE LIST */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 pb-3">
        {isLoading
          ? [...Array(8)].map((_, i) => <ShimmerCard key={i} />)
          : recommend?.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} lazy type={type} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}

export default Recommended;
