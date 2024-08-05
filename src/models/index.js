const Actor = require("./actors,models");
const Director = require("./directors.models");
const Genre = require("./genres.model");
const Movie = require("./movies.models");

Movie.belongsToMany(Actor, { through: 'movies_actors'})
Movie.belongsToMany(Director, { through: 'movies_director'})
Movie.belongsToMany(Genre, { through: 'movies_genres'})
