import React, { useEffect, useState } from "react";
import { useTvStoreApi } from "../tvApi/useTvStore";
import { useAuthStore } from "../store/useAuthStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TvDetailShimmer from "../components/MovieDetailShimmer";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useWishlistStore } from "../store/useWishList";
import ReleaseStatus from "../components/ReleaseStatus";
import Trailer from "../components/Trailer";

function TvDetailPage() {
  const { id } = useParams();

  const { isLoading, tvDetail, getTvSeriesdetail, getTvtrailer } =
    useTvStoreApi();
  const { addItem, removeItem, wishlist } = useWishlistStore();
  const { language, user } = useAuthStore();

  const [tvTrailer, setTvTrailer] = useState(null);

  //get trailer of tv series
  const getTVSeriesTrailer = async () => {
    const data = await getTvtrailer({
      tvId: id,
      language,
    });

    if (data?.results.length > 0) {
      setTvTrailer(data);
    }
  };

  useEffect(() => {
    if (language) {
      getTvSeriesdetail({
        tvId: id,
        language,
      });
      getTVSeriesTrailer();
    }
  }, [id, language]);

  const inWishlist = wishlist?.some((i) => i.movieId === String(tvDetail?.id));
  // wishlist handler
  const handleWishlist = () => {
    if (tvDetail) {
      if (inWishlist) {
        const doc = wishlist.find((i) => i.movieId === String(tvDetail?.id));
        if (doc) removeItem(doc.$id);
      } else {
        addItem({
          userId: user.$id,
          movie: tvDetail,
        });
      }
    }
  };

  if (!tvDetail) return <TvDetailShimmer />;
  return (
    <div className="w-full bg-black text-white pb-20 px-5">
      {/* Banner */}
      <div className="relative w-full h-[55vh] sm:h-[60vh] overflow-hidden">
        <motion.img
          src={`https://image.tmdb.org/t/p/original${tvDetail.backdrop_path}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div
          className="absolute bottom-4 md:bottom-0 cursor-pointer z-50 right-0 mr-5 "
          onClick={handleWishlist}
        >
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
            src={`https://image.tmdb.org/t/p/w500${tvDetail.poster_path}`}
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
            <ReleaseStatus release_date={tvDetail?.first_air_date} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            {tvDetail.original_name}
          </h1>
          <p className="text-gray-300 italic">{tvDetail.tagline}</p>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{tvDetail?.first_air_date?.split("-")[0]}</span>
            <span>•</span>
            <span>⭐ {tvDetail?.vote_average?.toFixed(1)}</span>
            <span>•</span>
            <span>🔥 {tvDetail?.popularity?.toFixed(2)}</span>
          </div>

          <motion.p className="mt-2 leading-relaxed text-gray-200">
            {tvDetail.overview?.length > 250
              ? tvDetail.overview.slice(0, 250) + "..."
              : tvDetail.overview}
          </motion.p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tvDetail.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-gray-900/50 text-gray-300 px-2 py-1 rounded-md text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
           <div className="mt-6 space-y-3  p-4 rounded-xl  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300 text-sm">
              <div>
                <span className="font-semibold">Status: </span>
                {tvDetail.status}
              </div>

              <div>
                <span className="font-semibold">Production: </span>
                {tvDetail.in_production ? "In Production" : "Completed"}
              </div>

              <div>
                <span className="font-semibold">Languages: </span>
                {tvDetail?.spoken_languages
                  ?.map((l) => l.english_name)
                  .join(", ")}
              </div>

              <div>
                <span className="font-semibold">Networks: </span>
                {tvDetail?.networks?.map((n) => n.name).join(", ")}
              </div>

              <div>
                <span className="font-semibold">Production Companies: </span>
                {tvDetail?.production_companies
                  ?.map((p) => p.name)
                  .join(", ") || "N/A"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
        <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        
      >
        {tvTrailer?.results && <Trailer trailer={tvTrailer?.results} />}
      
      </motion.div>
    </div>
  );
}

export default TvDetailPage;
