import { Router } from 'express';
import { faker } from '@faker-js/faker';
const router = Router();

const randomProducts = async (req, res) => {
    try {
  
        const prods = []


        for (let index = 0; index <= 5; index++) {
            
            const product = {
                id: index,
                name: faker.commerce.product(),
                stock: faker.random.numeric(),
                price: '$'+ faker.random.numeric(3),
            }
            
            prods.push(product)
            
        } 
     
        res.json({
        data: prods,
      });    
        }catch (err) {
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    }
  };


router.get('/', randomProducts)


export default router;