function PopularActorShimmer() {
  return (
    <div className="px-5 py-10 animate-pulse">
      <h1 className="text-2xl font-bold mb-5 bg-gray-700/40 h-6 w-40 rounded"></h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-[#0f0f0f] p-3 rounded-xl">
            <div className="w-full h-48 bg-gray-700/40 rounded-lg"></div>
            <div className="h-4 bg-gray-700/40 rounded w-3/4 mt-3"></div>
            <div className="h-3 bg-gray-700/40 rounded w-1/2 mt-2"></div>
            <div className="h-3 bg-gray-700/40 rounded w-2/3 mt-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularActorShimmer;
