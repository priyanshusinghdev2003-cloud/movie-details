import React from "react";
import { useWishlistStore } from "../store/useWishList";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";

function WishListPage() {
  const { removeItem, wishlist } = useWishlistStore();

  return (
    <motion.div
      className="mt-20 px-5 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl font-bold mb-5">Your Wishlist</h1>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="/empty-wishlist.svg"
            alt="Empty"
            className="w-40 opacity-70 mb-5"
          />
          <h2 className="text-xl text-gray-300 font-medium">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add movies to view them later!
          </p>
        </div>
      )}

      {/* MOVIE GRID */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {wishlist.map((movie, index) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.03 }}
              className="relative group"
            >
              <MovieCard movie={movie} lazy />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

export default WishListPage;
