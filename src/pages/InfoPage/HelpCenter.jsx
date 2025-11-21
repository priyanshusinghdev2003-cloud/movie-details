import React from "react";

function HelpCenter() {
  return (
    <div className="text-white px-6 py-10 mt-20">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <p className="text-gray-300 max-w-2xl leading-relaxed">
        Welcome to the ScreenFlix Help Center. Here you will find answers about 
        account settings, troubleshooting playback issues, and general platform usage.
      </p>

      <h2 className="text-xl font-semibold mt-6">Common Topics</h2>
      <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-2">
        <li>Cannot sign in?</li>
        <li>Video trailers not loading</li>
        <li>Watchlist not updating</li>
        <li>Language settings not applied</li>
      </ul>
    </div>
  );
}

export default HelpCenter;
