const { MovieDb } = require("moviedb-promise");
const { formatMovieBaseMany, formatMovieDetails } = require("./tmdb.utils");
const { TmdbErrorFactory } = require("../errors/TmdbError");

class Tmdb {
  MAX_PAGES = 500;
  LIMIT = 20;

  constructor(TMDB_API_KEY) {
    this.movieDb = new MovieDb(TMDB_API_KEY);
    this.MAX_RESULTS = this.MAX_PAGES * this.LIMIT;
  }

  async getPopularMovies({ page }) {
    try {
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
    } catch (error) {
      throw TmdbErrorFactory.create(error);
    }
  }

  async getMovieDetails({ movieId }) {
    try {
      const data = await this.movieDb.movieInfo({ id: movieId });

      return formatMovieDetails(data);
    } catch (error) {
      throw TmdbErrorFactory.create(error);
    }
  }

  async searchMovies({ query, page }) {
    try {
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
    } catch (error) {
      throw TmdbErrorFactory.create(error);
    }
  }

  async getMovieGenres() {
    try {
      const data = await this.movieDb.genreMovieList();

      return data;
    } catch (error) {
      throw TmdbErrorFactory.create(error);
    }
  }

  async getMovieByGenre({ genreId, page }) {
    try {
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
    } catch (error) {
      throw TmdbErrorFactory.create(error);
    }
  }
}

module.exports = Tmdb;
