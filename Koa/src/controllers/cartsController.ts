import CartsAPI from "../apis/cartsAPI"
import Service from "./msgController"
import {Context, Next } from 'koa'
import { Request } from 'koa-bodyparser'

const req = Request

class CartsController {
    hasIdParam (ctx: Context, next: Next) {
        ctx.params.id ? next() : ctx.body = {
            status: 'success',
            message: 'missing id',
          };
    }

    async getCart (ctx: Context, next: Next) {
        try {
            const response = await CartsAPI.getCart(ctx.params.id)
            Service.wsp(response)
            Service.sendEmail(response)
            return ctx.body = response
        } catch (error: any) {
            return error.message
        }
    }

    async createCart(id: string, phone: string) {
        try {
            await CartsAPI.createCart(id, phone)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateCart (ctx: Context, next: Next,) {
        try {
            const response = await CartsAPI.updateCart(ctx.params.id, ctx.request.body)
            return response
        } catch (error: any) {
            return error.message
        }
    }

    async emptyCart (ctx: Context, next: Next) {
        try{
            const response = await CartsAPI.emptyCart(ctx.params.id)
            return response
        } catch (error: any) {
            return error.message
        }
    }
}


const cartsController = new CartsController()
export default cartsController
