import { Router } from 'express';
import productsRouter from './products';
import shopRouter from './shop';
import test from './test'
import message from './message'

import home from './home'



const router = Router();

router.use('/home', home);
router.use('/products', productsRouter);
router.use('/shop', shopRouter);
router.use('/productos-test', test)
router.use('/chat', message)
export default router;