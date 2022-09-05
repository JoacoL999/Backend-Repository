import orderAPI from '../apis/orderAPI'
import { Request, Response, NextFunction } from 'express'

class OrderController {
    hasIdParam(req: Request, res: Response, next: NextFunction) {
        req.params.id ? next() : res.status(404).json({ msg: 'missing id' })
    }

    async getOrder(req: Request, res: Response) {
        try {
            const response = await orderAPI.getOrder(req.params.id)
            return res.status(200).json(response)
        } catch (error: any) {
            return res.status(404).json({ error: error.message })
        }
    }

    async createOrder(id: string, items: any) {
        try {
            console.log(items)
            let total = 0;
            items.forEach((game: any) => {
                let eachG = game.price * game.quantity
                total += eachG
                console.log(total)
                return total
            });
            await orderAPI.createOrder(id, items, total)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateOrder(req: Request, res: Response) {
        try {
            const { status } = req.body;
            console.log(status)
            let stat: any;
            if(status === 2){
                stat = 'Pagado'
            } else if(status === 3) {
                stat = 'Enviando'
            } else if(status === 4) {
                stat = 'Finalizado'
            }

            const response = await orderAPI.updateOrder(req.params.id, stat)
            return res.status(200).json(response)
        } catch (error: any) {
            return res.status(404).json({ error: error.message })
        }
    }

    async deleteOrder(req: Request, res: Response) {
        try{
            const response = await orderAPI.deleteOrder(req.params.id)
            return res.status(200).json(response)
        } catch (error: any) {
            return res.status(404).json({ error: error.message })
        }
    }
}


const orderController = new OrderController()
export default orderController