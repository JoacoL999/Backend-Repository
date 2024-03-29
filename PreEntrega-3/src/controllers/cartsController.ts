import CartsAPI from "../apis/cartsAPI"
import OrderController from "./orderController"
import Service from "./msgController"
import { Request, Response, NextFunction } from "express"

class CartsController {
    hasIdParam(req: Request, res: Response, next: NextFunction) {
        req.params.id ? next() : res.status(404).json({ msg: 'missing id' })
    }

    async getCart(req: Request, res: Response) {
        try {
            const response = await CartsAPI.getCart(req.params.id)
            Service.wsp(response)
            Service.sendEmail(response)
            return res.status(200).json(response)
        } catch (error: any) {
            return res.status(404).json({ error: error.message })
        }
    }

    async createCart(id: string, phone: string) {
        try {
            await CartsAPI.createCart(id, phone)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateCart(req: Request, res: Response) {
        try {
            const response = await CartsAPI.updateCart(req.params.id, req.body)
            return res.status(200).json(response)
        } catch (error: any) {
            return res.status(404).json({ error: error.message })
        }
    }

    async emptyCart(req: Request, res: Response) {
        try{
            const { order } = req.body
            
            if (order === false) {
                const response = await CartsAPI.emptyCart(req.params.id)
                return res.status(200).json(response)
            } else if (order === true) {
                const response = await CartsAPI.getCart(req.params.id)
                OrderController.createOrder(response.userID, response.carts)
                const responseAfter = await CartsAPI.emptyCart(req.params.id)
                return res.status(200).json(responseAfter)
            }
        } catch (error: any) {
            return res.status(404).json({ error: error.message })
        }
    }
}


const cartsController = new CartsController()
export default cartsController
