import { Router } from 'express'
import games from './games'
import auth from './auth'
import carts from './carts'
import order from './order'


const router = Router()

router.use('/game', games)
router.use('/auth', auth)
router.use('/cart', carts)
router.use('/order', order)



router.use('/', (req, res) => {
    res.status(404).json({
        message: 'Invalid API endpoint'
    })
})

export default router