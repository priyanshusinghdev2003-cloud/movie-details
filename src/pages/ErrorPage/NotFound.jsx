import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function Error404() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-extrabold text-red-500 drop-shadow-lg mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-300 text-lg mb-6 text-center"
      >
        Oops! The page you are looking for doesn’t exist.
      </motion.p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition-all"
      >
        <ArrowLeft size={18} />
        Go Back Home
      </Link>
    </div>
  );
}

export default Error404;
