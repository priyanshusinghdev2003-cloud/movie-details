import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

function CreditInfo({ credit = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 20, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] overflow-y-scroll space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-hide mt-5"
    >
      {credit.map((info,idx) => {
        const profile = info.profile_path
          ? `https://image.tmdb.org/t/p/w200${info.profile_path}`
          : null;

        return (
          <motion.div
            key={Number(info.id)+idx}
            whileHover={{
              scale: 1.04,
              rotateX: 5,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            className="flex items-center gap-4 p-3 rounded-lg bg-black/40 shadow-lg transition-all cursor-pointer"
          >
            {/* FULLY ROUNDED PROFILE IMAGE */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700 shadow-md">
             <Link to={`/charcter-info/${info?.id}`}>
              {profile ? (
                <motion.img
                  src={profile}
                  alt={info.name}
                  className="w-full h-full object-cover rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-700">
                  <User size={40} className="text-gray-300" />
                </div>
              )}
             </Link>
            </div>

            {/* INFO TEXT */}
            <div className="flex flex-col text-white">
              <h1 className="font-bold text-lg">
                {info.original_name || info.name}
              </h1>

              {info.character ? (
                <span className="text-gray-300 text-sm">🎭 {info.character}</span>
              ) : info.job ? (
                <span className="text-gray-300 text-sm">🛠 {info.job}</span>
              ) : null}

              <span className="text-gray-400 text-sm">
                {info.gender === 1 ? "Female" : "Male"}
              </span>

              <span className="text-gray-500 text-xs">
                {info.known_for_department || info.department}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default CreditInfo;
