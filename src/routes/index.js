const express = require('express');
const routerMovie = require('./movies.router');
const routerActor = require('./actors.router');
const routerGenre = require('./genres.router');
const routerDirector = require('./directors.router');
const router = express.Router();

router.use('/movies', routerMovie)
router.use('/actors', routerActor);
router.use('/genres', routerGenre)
router.use('/directors', routerDirector)

module.exports = router;