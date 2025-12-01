import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

function Trailer({ trailer = [] }) {
  if (!trailer || trailer.length === 0) return null;

  const [selected, setSelected] = useState(null);
  const modalRef = useRef(null);
  const [videoOn, setVideoOn] = useState("trailer");

  // Category mapping
  const typeMap = {
    trailer: "Trailer",
    teaser: "Teaser",
    clip: "Clip",
    Featurette: "Featurette",
  };

  // Filter videos by selected type
  const filteredVideos = trailer.filter(
    (v) => v.type.toLowerCase() === typeMap[videoOn].toLowerCase()
  );

  // GSAP modal animation
  useEffect(() => {
    if (selected && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selected]);

  return (
    <div className="mt-10 px-5 mb-5">
      <div className="flex gap-3 flex-col md:flex-row items-center">
        <h1 className="text-xl font-bold text-white mb-4">Videos</h1>
        <div className="p-1 border border-gray-300 rounded-2xl flex text-sm gap-1">
          {["trailer", "teaser", "clip", "Featurette"].map((t) => (
            <span
              key={t}
              onClick={() => setVideoOn(t)}
              className={`px-3 py-1 rounded-2xl cursor-pointer transition-all ${
                videoOn === t
                  ? "bg-[#032541] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      {filteredVideos.length === 0 && (
        <p className="text-gray-400 text-sm mt-2">No {videoOn} available.</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {filteredVideos.map((video, idx) => (
          <motion.div
            key={video.id + "-" + idx}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(video)}
            className="relative cursor-pointer rounded-xl overflow-hidden bg-black/40 border border-gray-800 shadow-md"
          >
            <img
              src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              alt={video.name}
              loading="lazy"
              className="w-full h-40 object-cover"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              ref={modalRef}
              className="w-[90%] sm:w-[70%] lg:w-[50%] bg-black rounded-xl shadow-xl overflow-hidden p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-white font-bold">{selected.name}</h2>

                <motion.button
                  onClick={() => setSelected(null)}
                  className="text-red-400 hover:text-red-300 text-lg cursor-pointer"
                >
                  ✕
                </motion.button>
              </div>
              <YouTube
                videoId={selected?.key}
                className="w-full rounded-lg overflow-hidden"
                opts={{
                  playerVars: { autoplay: 1 },
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Trailer;
