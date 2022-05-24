import { Router } from 'express';
import productsRouter from './products';
import shopRouter from './shop';
import test from './test'
import message from './message'

const router = Router();

router.use('/products', productsRouter);
router.use('/shop', shopRouter);
router.use('/productos-test', test)
router.use('/chat', message)
export default router;