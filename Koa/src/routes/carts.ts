import Router from 'koa-router';
import CartsController from '../controllers/cartsController'


const router = new Router({
    prefix: '/cart'
})

router.get('/:id', CartsController.hasIdParam, CartsController.getCart)
router.put('/:id', CartsController.hasIdParam, CartsController.updateCart)
router.delete('/:id', CartsController.hasIdParam, CartsController.emptyCart)

export default router.routes()