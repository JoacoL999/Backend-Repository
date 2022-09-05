import Order from '../models/order'

class OrderAPI {
    async getOrder(id: string) {
        return await Order.getOrder(id)
    }

    async createOrder(id: string, items: any, total: number) {
        return await Order.createOrder(id, items, total)
    }

    async updateOrder(id: string, state: string) {
        return await Order.updateOrder(id, state)
    }

    async deleteOrder(id: string) {
        return await Order.deleteOrder(id)
    }
}

const orderAPI = new OrderAPI()
export default orderAPI