const formatMoviePopular = (movie) => {
  const {
    id,
    title,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
  } = movie;

  return {
    id,
    title,
    overview,
    posterPath: posterPath
      ? "https://image.tmdb.org/t/p/original" + posterPath
      : null,
    releaseDate,
  };
};

const formatMovieDetails = (movie) => {
  const {
    id,
    title,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
    genres,
    runtime,
    backdrop_path: backdropPath,
  } = movie;

  return {
    id,
    title,
    overview,
    posterPath: posterPath
      ? "https://image.tmdb.org/t/p/original" + posterPath
      : null,
    releaseDate,
    genres: genres.map((genre) => genre.name),
    runtime,
    backdropPath: backdropPath
      ? "https://image.tmdb.org/t/p/original" + backdropPath
      : null,
  };
};
module.exports = {
  formatMoviePopular,
  formatMovieDetails,
};
