
function Genres({ genres, selectedGenres, setselectedGenres }) {
  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setselectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setselectedGenres([...selectedGenres, id]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
      {genres?.map((genre) => (
        <button
          key={genre.id}
          onClick={() => toggleGenre(genre.id)}
          className={`px-4 py-1 rounded-md text-sm border transition cursor-pointer
          ${
            selectedGenres.includes(genre.id)
              ? " border-violet-500"
              : " border-gray-600 hover:bg-gray-700"
          }`}
        >
            {selectedGenres.includes(genre?.id) && <span className="rounded-full bg-gray-800 py-1 px-2 border-1 border-gray-500 text-sm mr-2">X</span>}
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default Genres;
