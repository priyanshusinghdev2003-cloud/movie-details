import React, { useEffect, useState } from "react";
import { usePersonApi } from "../store/usePerson";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import PopularActorShimmer from "./PopularActorShimmer";
import { Link } from "react-router-dom";

function PopularActor() {
  const { language } = useAuthStore();
  const { getPopularPerson, popularPerson, isLoading } = usePersonApi();

  const [hoverActorId, setHoverActorId] = useState(null);
  const [selectedKnownFor, setSelectedKnownFor] = useState(null);

  useEffect(() => {
    getPopularPerson({ language });
  }, [language]);

  if (isLoading) return <PopularActorShimmer />;

  return (
    <div className="px-5 py-10">
      <h1 className="text-2xl font-bold  mb-5">Popular Actors</h1>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {popularPerson?.map((actor) => {
          const displayImage =
            selectedKnownFor?.actorID === actor.id
              ? `https://image.tmdb.org/t/p/w300${selectedKnownFor.poster_path}`
              : actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : "/no-actor.png";

          return (
            <motion.div
              key={actor.id}
              onMouseEnter={() => setHoverActorId(actor.id)}
              onMouseLeave={() => setHoverActorId(null)}
              className="relative min-w-[160px] h-[240px] rounded-xl overflow-hidden bg-black/40 cursor-pointer shadow-lg group"
            >
              <Link to={`/charcter-info/${actor?.id}`}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={displayImage}
                    src={displayImage}
                    alt={actor.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </Link>

              <div className="absolute bottom-3 left-3 z-20">
                <h2 className="text-white font-semibold drop-shadow-md text-sm truncate w-[130px]">
                  {actor.name}
                </h2>
              </div>

              <AnimatePresence>
                {hoverActorId === actor.id && (
                  <motion.div
                    initial={{ y: 110, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 110, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 backdrop-blur-sm z-30 rounded-t-xl"
                  >
                    <h3 className="text-white text-xs font-semibold mb-2">
                      Known For
                    </h3>

                    <div className="flex flex-col gap-2">
                      {actor.known_for?.slice(0, 3).map((item) => (
                        <button
                          key={item.id}
                          className="text-left text-gray-200 text-xs bg-white/10 hover:bg-violet-600 px-2 py-1 rounded-md transition truncate cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedKnownFor({ ...item, actorID: actor.id });
                          }}
                        >
                          {item.title || item.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularActor;
