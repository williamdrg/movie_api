const Actor = require("./actor.models");
const Director = require("./director.models");
const Genre = require("./genre.model");
const Movie = require("./movie.models");

Movie.belongsToMany(Actor, { through: 'movies_actors'})
Movie.belongsToMany(Director, { through: 'movies_director'})
Movie.belongsToMany(Genre, { through: 'movies_genres'})
