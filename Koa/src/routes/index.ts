import Router from 'koa-router'
import games from './games'
import auth from './auth'
import carts from './carts'


const router = new Router({
    prefix: '/api'
})

router.use(games)
router.use(auth)
router.use(carts)

export default router.routes()