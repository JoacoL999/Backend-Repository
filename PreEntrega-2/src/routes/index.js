import { Router } from 'express';
import productsRouter from './products';
import shopRouter from './shop';

const router = Router();

router.use('/products', productsRouter);
router.use('/shop', shopRouter);

export default router;