const express= require('express');
const MinefieldController= require('../controllers/minefield.controller') 
const LogicGameService = require('../services/logicGame.service')
const minefieldRoutes = express.Router()


const controller = new MinefieldController(LogicGameService)

minefieldRoutes.get('/', controller.index.bind(controller))
minefieldRoutes.get('/author', controller.author.bind(controller))
minefieldRoutes.get('/level', controller.level.bind(controller))
minefieldRoutes.get('/game', controller.game.bind(controller))
minefieldRoutes.get('/gaming', controller.gaming.bind(controller))
minefieldRoutes.get('/exploded', controller.exploded.bind(controller))
minefieldRoutes.get('/lose', controller.lose.bind(controller))
minefieldRoutes.get('/victory', controller.victory.bind(controller))

module.exports = minefieldRoutes