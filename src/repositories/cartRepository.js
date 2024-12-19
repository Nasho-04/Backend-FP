import Cart from "../models/cart.models.js";

class CartRepository {

    static async createCart(user_id) {
        return await Cart.save({ user_id: user_id, cart: [] })
    }
    static async getCart(user_id) {
        return await Cart.findOne({ user_id: user_id })
    }

    static async addToCart(user_id, product_id) {
        return await Cart.findOneAndUpdate({ user_id: user_id }, { $push: { cart: product_id } }, { new: true })
    }

    static async removeFromCart(user_id, product_id) {
        return await Cart.findOneAndUpdate({ user_id: user_id }, { $pull: { cart: product_id } }, { new: true })
    }
}

export default CartRepository