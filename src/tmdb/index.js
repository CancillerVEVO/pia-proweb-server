const Tmdb = require("./Tmdb");

const tmdb = new Tmdb(process.env.TMDB_API_KEY);

module.exports = tmdb;
