import React, { useEffect } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import { useAuthStore } from "../store/useAuthStore";
import Hero from "../components/Hero";
import Upcoming from "../components/Upcoming";
import Trending from "../components/TRending";
import Popular from "../components/Popular";
import PopularActor from "../components/PopularActor";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function Homepage() {
  const { getFeaturedMovie, featuredMovie } = useMovieApi();
  const { region, language } = useAuthStore();
  useEffect(() => {
    if (region && language) {
      getFeaturedMovie({
        region,
        language,
      });
    }
  }, [region, language]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero featuredMovie={featuredMovie} />
        <Trending />
        <Popular />
        <PopularActor />
        <Upcoming />
      </motion.div>
    </AnimatePresence>
  );
}

export default Homepage;
