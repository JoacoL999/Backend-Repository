import Router from 'koa-router';
import {Context, Next } from 'koa'
import GamesController from '../controllers/gamesController'

const router = new Router({
    prefix: '/game'
})

router.get('/:id', GamesController.getGames)

router.get('/', GamesController.getGames)

router.post('/', GamesController.isValid, GamesController.postGame)

router.put('/:id', GamesController.hasIdParam, GamesController.isValid, GamesController.updateGame)

router.delete('/:id', GamesController.hasIdParam, GamesController.deleteGame)

export default router.routes()