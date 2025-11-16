import React, { useEffect, useRef } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import gsap from "gsap";
import { useWishlistStore } from "../store/useWishList";
import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom"
function MovieCard({ movie }) {
  const cardRef = useRef(null);

  const { addItem, removeItem, wishlist } = useWishlistStore();
   const {user}= useAuthStore()

  // Check if movie exists in wishlist
  const inWishlist = wishlist.some((i) => i.movieId === String(movie.id));

  // GSAP hover animation
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
    if (inWishlist) {
      const doc = wishlist.find((i) => i.movieId === String(movie.id));
      if (doc) removeItem(doc.$id);
    } else {
      addItem({
        userId: user.$id, movie
      }); // You pass userId from parent OR use global auth store
    }
  };

  return (
     <Link to={`/movie-detail/${movie.id}`}>
    <div
      ref={cardRef}
      className="relative w-[180px] h-[270px] rounded-lg overflow-hidden bg-black cursor-pointer shadow-lg"
    >
       <div className="absolute top-0 bg-gradient-to-t from-black via-black/70 to-transparent backdrop-blur-2xl"></div>
      {/* Poster */}
     
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="w-full h-full object-cover"
        alt={movie.title}
      />
     

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text info */}
      <div className="absolute bottom-2 left-2 right-2">
        <h1 className="text-white font-bold text-sm truncate">{movie.title}</h1>
        <p className="text-gray-300 text-xs">
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>

      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleWishlist();
        }}
        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-black/70 transition"
      >
        {inWishlist ? (
          <BookmarkCheck size={20} className="text-green-400" />
        ) : (
          <Bookmark size={20} className="text-white" />
        )}
      </button>
    </div>
     </Link>
  );
}

export default MovieCard;
