import { Router } from 'express'
import OrderController from '../controllers/orderController'

const router = Router()

router.get('/:id', OrderController.hasIdParam, OrderController.getOrder)
router.put('/:id', OrderController.hasIdParam, OrderController.updateOrder)
router.delete('/:id', OrderController.hasIdParam, OrderController.deleteOrder)

export default router