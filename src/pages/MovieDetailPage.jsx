import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieApi } from "../movieApi/useGetMovie";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useWishlistStore } from "../store/useWishList";
import CreditInfo from "../components/CreditInfo";
import Trailer from "../components/Trailer";
import ReleaseStatus from "../components/ReleaseStatus";
import MovieDetailShimmer from "../components/MovieDetailShimmer";

function MovieDetailPage() {
  const { addItem, removeItem, wishlist } = useWishlistStore();
  const { id } = useParams();
  const { user,language } = useAuthStore();
  const {
    getMovieDetail,
    getMovieRecommendation,
    getMovieCredits,
    getMOvieTRailer,
  } = useMovieApi();
  const [movieDetail, setMovieDetail] = useState(null);
  const [getMovieRecommendationData, setGetMovieRecommendation] = useState([]);
  const [getCredit, setGetCredit] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);

  const progressRef = useRef(null);

  const getMoviEDetailHandler = async () => {
    const data = await getMovieDetail({
      movieId: id,
      language,
    });
    setMovieDetail(data);
  };
  const getMovieCredit = async () => {
    const data = await getMovieCredits({
      movieId: id,
      language,
    });
    setGetCredit(data);
  };
  const getMoviEDetailImageHandler = async () => {
    const data = await getMovieRecommendation({
      movieId: id,
    });

    setGetMovieRecommendation(data);
  };
  const getMoviEDetailTrailer = async () => {
    const data = await getMOvieTRailer({
      movieId: id,
      language,
    });

    setMovieTrailer(data);
  };

  useEffect(() => {
    getMoviEDetailHandler();
    getMoviEDetailImageHandler();
    getMovieCredit();
    getMoviEDetailTrailer();
  }, [id]);

  const inWishlist = wishlist?.some(
    (i) => i.movieId === String(movieDetail?.id)
  );

  // Animate progress bar to show revenue vs budget
  useEffect(() => {
    if (movieDetail && progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { value: 0 },
        {
          value: movieDetail?.revenue,
          duration: 4,
          ease: "power2.out",
        }
      );
    }
  }, [movieDetail]);


  // wishlist handler
   const handleWishlist = () => {
    if(movieDetail){
      if (inWishlist) {
      const doc = wishlist.find((i) => i.movieId === String(movieDetail?.id ));
      if (doc) removeItem(doc.$id);
    } else {
      addItem({
        userId: user.$id, movie:movieDetail
      }); 
    }
    }
  };

  if (!movieDetail) return <MovieDetailShimmer />;

  return (
    <div className="w-full bg-black text-white pb-20 px-5">
      {/* Banner */}
      <div className="relative w-full h-[55vh] sm:h-[60vh] overflow-hidden">
        <motion.img
          src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-4 md:bottom-0 cursor-pointer z-50 right-0 mr-5 " onClick={handleWishlist}>
          {inWishlist ? (
            <BookmarkCheck size={30} className="text-green-400" />
          ) : (
            <Bookmark size={30} className="text-white" />
          )}
        </div>
      </div>

    {/* Poster and Detail  */}
      <div className="flex flex-row gap-6 px-6 sm:px-12 -mt-20 relative">
        <div className="h-56 w-40 sm:h-74 sm:w-44 rounded-md overflow-hidden shadow-xl shrink-0 mx-auto sm:mx-0 relative">
          <motion.img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white w-fit p-2 absolute top-2 z-5 text-black rounded-md right-2"
          >
            <ReleaseStatus release_date={movieDetail?.release_date} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            {movieDetail.title}
          </h1>
          <p className="text-gray-300 italic">{movieDetail.tagline}</p>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{movieDetail?.release_date?.split("-")[0]}</span>
            <span>•</span>
            <span>⭐ {movieDetail?.vote_average?.toFixed(1)}</span>
            <span>•</span>
            <span>🔥 {movieDetail?.popularity?.toFixed(2)}</span>
          </div>

          <motion.p className="mt-2 leading-relaxed text-gray-200">
            {movieDetail.overview?.length > 250
              ? movieDetail.overview.slice(0, 250) + "..."
              : movieDetail.overview}
          </motion.p>
          <div className="flex flex-wrap gap-2 mt-3">
            {movieDetail.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-gray-900/50 text-gray-300 px-2 py-1 rounded-md text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-1">
              Revenue vs Budget (${movieDetail?.budget?.toLocaleString()})
            </p>

            <div className="flex items-center gap-3 w-full">
              <progress
                ref={progressRef}
                max={movieDetail.budget}
                className="w-full h-2 rounded-md overflow-hidden"
              />
              <span className="text-green-400 font-semibold">
                ${(movieDetail.revenue / 1_000_000).toFixed(1)}M
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Trailer trailer={movieTrailer?.results} />
      </motion.div>
      <div className="flex gap-2 items-center mt-5">
        <CreditInfo credit={getCredit?.cast} />
        <CreditInfo credit={getCredit?.crew} />
      </div>
    </div>
  );
}

export default MovieDetailPage;
