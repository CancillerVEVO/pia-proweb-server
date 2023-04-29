const { MovieDb } = require("moviedb-promise");
const {
  formatMovieBaseMany,
  formatMovieDetails,
} = require("./utils/movie.formatter");

class Tmdb {
  MAX_PAGES = 500;
  LIMIT = 20;

  constructor(TMDB_API_KEY) {
    this.movieDb = new MovieDb(TMDB_API_KEY);
    this.MAX_RESULTS = this.MAX_PAGES * this.LIMIT;
  }

  async getPopularMovies({ page }) {
    // HACK: The MovieDB API has a limit of 500 pages???
    if (page > this.MAX_PAGES)
      return {
        page,
        totalPages: this.MAX_PAGES,
        totalResults: this.MAX_RESULTS,
        results: [],
      };

    const data = await this.movieDb.discoverMovie({
      page,
      include_adult: false,
    });

    const results = formatMovieBaseMany(data.results);

    return {
      page: data.page,
      totalPages:
        data.total_pages > this.MAX_PAGES ? this.MAX_PAGES : data.total_pages,
      totalResults:
        data.total_results > this.MAX_RESULTS
          ? this.MAX_RESULTS
          : data.total_results,
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

    const results = formatMovieBaseMany(data.results);

    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results,
    };
  }

  async getMovieGenres() {
    const data = await this.movieDb.genreMovieList();

    return data;
  }

  async getMovieByGenre({ genreId, page }) {
    // HACK: The MovieDB API has a limit of 500 pages???
    if (page > this.MAX_PAGES)
      return {
        page,
        totalPages: this.MAX_PAGES,
        totalResults: this.MAX_RESULTS,
        results: [],
      };

    const data = await this.movieDb.discoverMovie({
      with_genres: genreId,
      page,
      include_adult: false,
    });

    const results = formatMovieBaseMany(data.results);

    return {
      page: data.page,
      totalPages:
        data.total_pages > this.MAX_PAGES ? this.MAX_PAGES : data.total_pages,
      totalResults:
        data.total_results > this.MAX_RESULTS
          ? this.MAX_RESULTS
          : data.total_results,
      results,
    };
  }
}

module.exports = Tmdb;