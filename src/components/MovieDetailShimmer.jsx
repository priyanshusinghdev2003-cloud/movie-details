import React from "react";
import { motion } from "framer-motion";

function MovieDetailShimmer() {
  return (
    <div className="w-full bg-black text-white pb-20 px-5 animate-pulse">
      <div className="relative w-full h-[55vh] sm:h-[60vh] bg-gray-800 rounded-md overflow-hidden mb-6"></div>

      {/* poster + info */}
      <div className="flex flex-row gap-6 px-6 sm:px-12 -mt-20 relative">
        {/* poster */}
        <div className="h-56 w-40 sm:h-74 sm:w-44 rounded-md bg-gray-700/40"></div>

        {/*  info */}
        <div className="flex flex-col gap-3 max-w-3xl flex-1">
          <div className="h-8 bg-gray-700/40 w-2/3 rounded-md"></div>
          <div className="h-4 bg-gray-700/40 w-1/2 rounded-md"></div>

          <div className="flex gap-2 mt-2">
            <div className="h-4 w-10 bg-gray-700/40 rounded-md"></div>
            <div className="h-4 w-10 bg-gray-700/40 rounded-md"></div>
            <div className="h-4 w-10 bg-gray-700/40 rounded-md"></div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="h-4 w-full bg-gray-700/40 rounded-md"></div>
            <div className="h-4 w-5/6 bg-gray-700/40 rounded-md"></div>
            <div className="h-4 w-4/6 bg-gray-700/40 rounded-md"></div>
          </div>

          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-16 bg-gray-700/40 rounded-md"></div>
            ))}
          </div>

          <div className="mt-6 w-full">
            <div className="h-4 bg-gray-700/40 w-40 rounded-md mb-2"></div>
            <div className="h-2 bg-gray-700/40 rounded-md w-full"></div>
          </div>
        </div>
      </div>

      <div className="mt-12 px-5">
        <div className="h-6 w-32 bg-gray-700/40 rounded-md mb-4"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 w-full bg-gray-700/40 rounded-xl"
            ></div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-10 px-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 w-20 bg-gray-700/40 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailShimmer;
