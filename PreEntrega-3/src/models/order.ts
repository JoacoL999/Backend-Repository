import mongoose from "mongoose"
import moment from "moment"
import MongoDB from "../utils/mongoConnection"
import { errorLogger } from '../utils/loggers'


const dbCollection = 'order'

// const itemProd = new mongoose.Schema({
//     name: { type: String, required: true },
//     quantity: {type: Number, required: true},
//     price: {type: Number, required: true}
     
// })

const orderSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    date: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')},
    status: { type: String, required: true },
    total: { type: Number, required: true},
    Items: { type: Object, required: false }
})

class Order {
    private order

    constructor(){
        MongoDB.getConnection()
        this.order = mongoose.model(dbCollection, orderSchema)
    }


    async getOrder(id: string) {
        try {
            const response = await this.order.findOne({ userID: id})
            if (response.length == 0) {
                throw new Error('Cart not found')
            }
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting order: ${error.messages}`)
        }
    }


    async createOrder(id: string, items: any, total: number) {
        try{
            const response = await this.order.create({userID: id, status: 'Generado', Items: items, total: total})
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error creating order: ${error.message}`)
          }
    }

    async updateOrder(id: string, state: string) {
        try{
            const response = await this.order.findOneAndUpdate({ userID: id }, {status: state})
            if (!response) {
                throw new Error('order not found')
            }
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error updating order: ${error.message}`)
        }
    }

    async deleteOrder(id: string) {
        try {
            const response = await this.order.findOneAndDelete({ userID: id})
            if (!response) {
                throw new Error('Cart not found')
            }
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error deleting order: ${error.message}`)
        }
    }
}

const order = new Order()
export default order