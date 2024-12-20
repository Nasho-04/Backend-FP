import CartObject from "../models/cart.models.js";

class CartObjectRepository {
    static async getCart() {
        return await CartObject.find()
    }

    static async addToCart(user_id, product_id) {
        return await CartObject.create({ user_id: user_id, product_id: product_id })
    }

    static async removeFromCart(user_id, product_id) {
        return await CartObject.findOneAndDelete({ user_id: user_id, product_id: product_id })
    }
}

export default CartObjectRepository