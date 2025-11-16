function ReleaseStatus({ release_date }) {
  if (!release_date) return null;

  const today = new Date();
  const movieDate = new Date(release_date);

  const isUpcoming = movieDate > today;

  return (
    <span
      className={`${
        isUpcoming
          ? " text-black"
          : " text-green-600"
      }`}
    >
      {isUpcoming ? "Upcoming" : "Released"}
    </span>
  );
}

export default ReleaseStatus;
