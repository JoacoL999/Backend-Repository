import { Router } from 'express';
import { getAllMessages } from '../controllers/messages';

const router = Router();


router.get('/', getAllMessages);

export default router