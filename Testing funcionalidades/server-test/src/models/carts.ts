import mongoose from "mongoose"
import moment from "moment"
import MongoDB from "../utils/mongoConnection"
import { errorLogger } from '../utils/loggers'
import wspController from '../controllers/msgController'

const dbCollection = 'carts'

const cartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    date: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')},
    phoneNum: { type: String, required: true },
    carts: { type: Array, required: false }
})

class Carts {
    private carts

    constructor(){
        MongoDB.getConnection()
        this.carts = mongoose.model(dbCollection, cartSchema)
    }


    async getCart(id: string) {
        try {
            const response = await this.carts.findOne({ user: id})
            if (response.length == 0) {
                throw new Error('Cart not found')
            }
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting carts: ${error.messages}`)
        }
    }

    async createCart(id: string, phone: string) {
        try{
            const response = await this.carts.create({user: id, phoneNum: phone,carts: []})
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error creating cart: ${error.message}`)
          }
    }

    async updateCart(id: string, cart: any) {
        try{
            const response = await this.carts.findOneAndUpdate({ user: id }, cart )
            if (!response) {
                throw new Error('Cart not found')
            }
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error updating cart: ${error.message}`)
        }
    }

    async emptyCart(id: string) {
        try {
            const response = await this.carts.findOneAndUpdate({ user: id}, { carts: []})
            if (!response) {
                throw new Error('Cart not found')
            }
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error emptying cart: ${error.message}`)
        }
    }
}

const carts = new Carts()
export default carts