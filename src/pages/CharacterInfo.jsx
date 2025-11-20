import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePersonApi } from "../store/usePerson";
import { useAuthStore } from "../store/useAuthStore";
import MovieCard from "../components/MovieCard";

function CharacterInfo() {
  const { id } = useParams();
  const { language } = useAuthStore();
  const { getPopularPersonDetail } = usePersonApi();

  const [actor, setActor] = useState(null);

  const fetchActor = async () => {
    const data = await getPopularPersonDetail({
      id,
      language,
    });
    setActor(data);
  };

  useEffect(() => {
    fetchActor();
  }, [id]);

  if (!actor)
    return <div className="text-white p-10 text-xl">Loading actor details...</div>;

  const {
    name,
    biography,
    profile_path,
    birthday,
    known_for_department,
    movie_credits,
    also_known_as,
  } = actor;


  return (
    <div className="w-full text-white pb-20 mt-16">
      <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
        <img
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/original${profile_path}`
              : "/no-actor.png"
          }
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>
      <div className="px-6 sm:px-12 -mt-24 relative z-10 flex flex-col sm:flex-row gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-40 h-56 sm:w-48 sm:h-72 rounded-xl overflow-hidden shadow-lg shrink-0 mx-auto sm:mx-0"
        >
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w500${profile_path}`
                : "/no-actor.png"
            }
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>

          <p className="text-gray-400 text-sm">
            {known_for_department} • {birthday || "Unknown"}
          </p>

          {also_known_as?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {also_known_as.map((aka) => (
                <span
                  key={aka}
                  className="bg-gray-800/50 text-gray-300 px-2 py-1 rounded-md text-xs"
                >
                  {aka}
                </span>
              ))}
            </div>
          )}

          <p className="mt-3 text-gray-200 leading-relaxed">
            {biography && biography.length > 0
              ? biography
              : "No biography available for this actor."}
          </p>
        </motion.div>
      </div>
      <div className="px-5 mt-10">
        <h2 className="text-2xl font-bold mb-4">Movies Worked In</h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 pb-3">
          {movie_credits?.cast?.map((movie, idx) => (
            <motion.div
              key={movie.id + idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              <Link to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} lazy />
              </Link>

           {movie.character && <p className="text-xs text-center text-gray-300 mt-1 absolute top-0 bg-amber-600 p-1 px-2 rounded-r-md">
              as {movie?.character.length < 10 ? movie.character : movie.character.slice(0,10)+"..."}
            </p>}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="px-5 mt-14">
        <h2 className="text-2xl font-bold mb-4">Known For</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {movie_credits?.cast
            ?.sort((a, b) => b.popularity - a.popularity)
            ?.slice(0, 6)
            ?.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} lazy />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;
