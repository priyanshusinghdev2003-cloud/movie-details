import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerThumbnail } from "react-shimmer-effects";

function Hero({ featuredMovie = [] }) {
  if (!featuredMovie || featuredMovie.length === 0)
    return <ShimmerThumbnail height={400} />;
  const [currentMovie, setCurrentMovie] = useState(featuredMovie?.[0] || null);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-md">
      <div
        className="relative h-full w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentMovie?.id}
            src={`https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path}`}
            className="w-full h-full object-cover rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />
      </div>

      <motion.div
        className="absolute bottom-20  md:top-20 left-15 max-w-[45%] flex flex-col "
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-xl great-vibes-regular">
          {currentMovie?.title || currentMovie?.name}
        </h1>

        <p
          className="text-gray-200 mt-2 text-sm sm:text-lg drop-shadow-lg "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 40%,rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)",
          }}
        >
          {currentMovie?.overview || "No overview available."}
        </p>
      </motion.div>

      <div className="absolute bottom-5 left-5  justify-evenly gap-4 overflow-x-auto scrollbar-hide pr-3  w-full hidden md:flex">
        {featuredMovie.map((movie) => {
          const isActive = movie.id === currentMovie?.id;
          if (!movie?.backdrop_path) {
            return;
          }

          return (
            <motion.div
              key={movie.id}
              onClick={() => setCurrentMovie(movie)}
              whileHover={{ scale: 1.05 }}
              className={`
                relative cursor-pointer rounded-lg overflow-hidden shadow-lg
                transition-all duration-300
                ${isActive ? "ring-2 ring-red-500 scale-110" : "opacity-60 scale-95"}
              `}
              style={{
                width: isActive ? "180px" : "150px",
                height: isActive ? "260px" : "220px",
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/default-poster.png"
                }
                className="w-full h-full object-cover"
                alt={movie.title}
              />

              {/* Poster gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Hero;
