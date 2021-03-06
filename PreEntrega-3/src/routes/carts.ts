import { Router } from 'express'
import CartsController from '../controllers/cartsController'
import wspController from '../controllers/msgController'

const router = Router()

router.get('/:id', CartsController.hasIdParam, CartsController.getCart)
router.put('/:id', CartsController.hasIdParam, CartsController.updateCart)
router.delete('/:id', CartsController.hasIdParam, CartsController.emptyCart)

export default router