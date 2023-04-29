const { MovieDb } = require("moviedb-promise");
const {
  formatMoviePopular,
  formatMovieDetails,
} = require("./utils/movie.formatter");

class Tmdb {
  constructor(TMDB_API_KEY) {
    this.movieDb = new MovieDb(TMDB_API_KEY);
  }

  async getPopularMovies({ page }) {
    const data = await this.movieDb.discoverMovie({
      page,
      include_adult: false,
    });

    const results = data.results.map((movie) => formatMoviePopular(movie));

    return {
      page: data.page,
      totalPages: data.total_pages > 500 ? 500 : data.total_pages,
      totalResults: data.total_pages > 500 ? 10000 : data.total_results,
      results,
    };
  }

  async getMovieDetails({ movieId }) {
    const data = await this.movieDb.movieInfo({ id: movieId });

    return formatMovieDetails(data);
  }

  async searchMovies({ query, page }) {
    const data = await this.movieDb.searchMovie({
      query,
      page,
      include_adult: false,
    });

    return data;
  }
}

module.exports = Tmdb;
