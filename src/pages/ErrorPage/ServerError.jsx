import React from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

function Error500({ retry }) {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white px-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-yellow-400 drop-shadow-xl"
      >
        500 Server Error
      </motion.h1>

      <p className="text-gray-400 mt-4 text-center max-w-md">
        Something went wrong on our side. Please try again in a moment.
      </p>

      <button
        onClick={retry}
        className="mt-6 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg flex items-center gap-2 transition"
      >
        <RefreshCw size={18} /> Retry
      </button>
    </div>
  );
}

export default Error500;
