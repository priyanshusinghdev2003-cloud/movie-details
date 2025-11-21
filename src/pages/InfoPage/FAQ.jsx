import React from "react";

function FAQ() {
  const faqs = [
    {
      q: "How can I search for movies?",
      a: "Use the search bar from the Discover page to find movies by title, genre, or year.",
    },
    {
      q: "How do I add movies to watchlist?",
      a: "Click the bookmark icon on any movie card or movie detail page.",
    },
    {
      q: "Does ScreenFlix require sign in?",
      a: "You can browse without login, but features like Watchlist require Google Sign-In.",
    },
  ];

  return (
    <div className="text-white px-6 py-10 mt-20">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-5">
        {faqs.map((f, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded-lg">
            <h2 className="font-semibold text-xl mb-2">{f.q}</h2>
            <p className="text-gray-300">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
