import React, { useEffect, useRef } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import gsap from "gsap";
import { useWishlistStore } from "../store/useWishList";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function MovieCard({ movie: data, type = "movie" }) {
  const cardRef = useRef(null);

  const { addItem, removeItem, wishlist } = useWishlistStore();
  const { user } = useAuthStore();

  // Check if movie exists in wishlist
  const inWishlist = wishlist.some(
    (i) => i.movieId === String(data.id || data.movieId)
  );

  useEffect(() => {
    const el = cardRef.current;

    const enter = () => {
      gsap.to(el, {
        scale: 1.06,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leave = () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const handleWishlist = () => {
    if (!user) {
      toast.error("User not login");
      return;
    }
    if (inWishlist) {
      const doc = wishlist.find(
        (i) => i.movieId === String(data.id || data.movieId)
      );
      if (doc) removeItem(doc.$id);
      toast.success("Removed from Wishist!");
    } else {
      addItem({
        userId: user.$id,
        movie: data,
      });
      toast.success("Added To WishList");
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative w-[180px] h-[270px] rounded-lg overflow-hidden bg-black cursor-pointer shadow-lg"
    >
      <Link to={`/${type}-detail/${data.id || data.movieId}`}>
        <div className="absolute top-0 bg-gradient-to-t from-black via-black/70 to-transparent backdrop-blur-2xl"></div>
        {/* Poster */}

        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : "/default-poster.png"
          }
          className="w-full h-full object-cover"
          alt={data.title || data?.original_name}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Text info */}
        <div className="absolute bottom-2 left-2 right-2">
          <h1 className="text-white font-bold text-sm truncate">
            {data.title || data?.original_name}
          </h1>
          <p className="text-gray-300 text-xs">
            {data.release_date?.slice(0, 4) ||
              data?.first_air_date?.slice(0, 4)}
          </p>
        </div>
      </Link>

      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleWishlist();
        }}
        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-black/70 transition"
      >
        {inWishlist ? (
          <BookmarkCheck
            size={20}
            className="text-green-400 cursor-pointer hover:text-white"
          />
        ) : (
          <Bookmark
            size={20}
            className="text-white cursor-pointer hover:text-green-400"
          />
        )}
      </button>
      {data?.adult && (
        <span className="absolute top-2 left-0 bg-red-500/50 p-1 px-2 rounded-r-md hover:bg-red-500/70 transition">
          18+
        </span>
      )}
    </div>
  );
}

export default MovieCard;
