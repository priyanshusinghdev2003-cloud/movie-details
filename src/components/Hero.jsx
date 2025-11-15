import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ShimmerThumbnail } from "react-shimmer-effects";

function Hero({ featuredMovie = [] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const heroRef = useRef();

  useEffect(() => {
    if (!featuredMovie?.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % featuredMovie?.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [featuredMovie?.length]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, [currentImage]);

  const overview ="jhvjyhv"
  // Limit overview to 40 chars
//   const overview = featuredMovie[currentImage]?.overview?.length > 60
//       ? featuredMovie[currentImage]?.overview?.slice(0, 60) + "..."
//       : featuredMovie[currentImage]?.overview;

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-md">
      {featuredMovie ? (
        <AnimatePresence mode="wait">
          <div>
            <motion.img
              key={featuredMovie[currentImage]?.id}
              ref={heroRef}
              src={`https://image.tmdb.org/t/p/original${featuredMovie[currentImage]?.backdrop_path}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />

            {/* Text Overlay (Right Side) */}
            <motion.div
              className="absolute bottom-10 right-6 max-w-[45%] flex flex-col items-end text-right p-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold text-gray-100 drop-shadow-md leading-tight">
                {featuredMovie[currentImage]?.title}
              </h1>

              <p className="text-md font-medium text-gray-300 mt-2 drop-shadow-md">
                {overview}
              </p>
            </motion.div>
          </div>
        </AnimatePresence>
      ) : (
        <ShimmerThumbnail className="bg-black" />
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      {/* Right-side Indicators */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {featuredMovie?.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage ? "bg-white scale-125" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
