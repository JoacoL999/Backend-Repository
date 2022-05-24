import { Router } from 'express';
import {
    getAllShop,
    getShopById,
    createShop,
    addProducts,
    deleteShop,
    checkBodyShop,
} from '../controllers/shop';

const router = Router();

router.get('/', getAllShop);

router.get('/:id', getShopById);

router.post('/', checkBodyShop, createShop);

router.put('/:id', checkBodyShop, addProducts);

router.delete('/:id', deleteShop);

export default router;