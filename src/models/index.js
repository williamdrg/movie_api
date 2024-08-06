const Actor = require("./Actor")
const Director = require("./Director")
const Genre = require("./Genre")
const Movie = require("./Movie")

Movie.belongsToMany(Actor, { through: 'moviesActors'})
Movie.belongsToMany(Director, { through: 'moviesDirector'})
Movie.belongsToMany(Genre, { through: 'moviesGenres'})
