import CartObject from "../models/cart.models.js";

class CartObjectRepository {
    static async getCart(user_id) {
        return await CartObject.findAll({ user_id: user_id })
    }

    static async addToCart(user_id, product_id) {
        return await CartObject.create({ user_id: user_id, product_id: product_id })
    }

    static async createCart(user_id) {
        return await CartObject.create({ user_id: user_id })
    }

    static async deleteCart(user_id) {
        return await CartObject.findOneAndDelete({ user_id: user_id, product_id: product_id })
    }
}

export default CartObjectRepository