const formatMovieImageUrl = (path) => {
  return path ? process.env.TMDB_IMAGE_URL + path : null;
};

const formatMovieBase = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: formatMovieImageUrl(movie.poster_path),
    releaseDate: movie.release_date,
  };
};

const formatMovieBaseMany = (movies) => {
  return movies.map((movie) => formatMovieBase(movie));
};

const formatMovieDetails = (movie) => {
  const formattedMovie = formatMovieBase(movie);

  return {
    ...formattedMovie,
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime,
    backdropPath: formatMovieImageUrl(movie.backdrop_path),
    tagline: movie.tagline,
  };
};

module.exports = {
  formatMovieBase,
  formatMovieBaseMany,
  formatMovieDetails,
};
