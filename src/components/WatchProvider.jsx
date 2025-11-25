import React, { useEffect, useState, useRef } from "react";
import { useMovieApi } from "../movieApi/useGetMovie";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useAuthStore } from "../store/useAuthStore";

function WatchProvider({ movieId }) {
  const { watchProvider, getWatchProvider, isLoading } = useMovieApi();
  const {regionCode}=useAuthStore()
  const [selectedCountry, setSelectedCountry] = useState(regionCode || "US"); 
    const [selectedTab, setSelectedTab] = useState("flatrate");


  useEffect(() => {
    getWatchProvider({ movieId });
  }, [movieId]);

  if (!watchProvider || Object.keys(watchProvider).length == 0) return null;

  const allCountries = Object.keys(watchProvider);

  const countryData = watchProvider[selectedCountry] || {};

  const providerTypes = [
    { key: "flatrate", label: "Streaming" },
    { key: "ads", label: "With Ads" },
    { key: "rent", label: "Rent" },
    { key: "buy", label: "Buy" },
  ];
const providers = countryData[selectedTab];



  return (
    <div className="mt-10 px-5 mb-5">
         <h1 className="text-xl font-bold text-white mb-4">Watch Providers</h1>
      <div className="flex gap-3 items-center">
       

        {/* Country Dropdown */}
        <select
          className="bg-black/90 text-white px-3 py-1 rounded-lg outline-none cursor-pointer scrollbar-hide"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {allCountries.map((c) => (
            <option key={c} value={c} className="cursor-pointer">
              {c}
            </option>
          ))}
        </select>
        <div className="p-1 border border-gray-600 rounded-2xl flex text-sm gap-1">
          {providerTypes.map((type) => (
            <span
              key={type.key}
              onClick={() => setSelectedTab(type.key)}
              className={`px-3 py-1 rounded-2xl cursor-pointer transition-all ${
                selectedTab === type.key
                  ? "bg-[#032541] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type.label}
            </span>
          ))}
        </div>
      </div>

      {/* No Providers */}
      {!providers?.length && (
        <p className="text-gray-400 text-sm mt-2">
          No providers available in this category.
        </p>
      )}

      {/* Provider Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
        {providers?.map((prov, idx) => (
          <motion.div
            key={prov.provider_id + "-" + idx}
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer rounded-xl overflow-hidden bg-black/40 border border-gray-800 shadow-md p-3 flex flex-col items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w92${prov.logo_path}`}
              alt={prov.provider_name}
              className="w-16 h-16 object-cover rounded-lg mb-2"
            />

            <p className="text-center text-sm text-gray-300">
              {prov.provider_name}
            </p>
          </motion.div>
        ))}
      </div>

     
    </div>
  );
}

export default WatchProvider;
