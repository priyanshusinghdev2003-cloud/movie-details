import React from "react";
import { WifiOff } from "lucide-react";

function NetworkError() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white px-6">
      <WifiOff className="text-blue-400" size={60} />

      <h1 className="text-3xl font-bold mt-4">No Internet Connection</h1>

      <p className="text-gray-400 mt-2 text-center">
        Please check your connection and try again.
      </p>

      <button
        onClick={() => window.location.replace("/")}
        className="mt-6 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Reload Page
      </button>
    </div>
  );
}

export default NetworkError;
