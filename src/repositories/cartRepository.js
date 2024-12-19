import Cart from "../models/cart.models.js";

class CartRepository {
    static async getCart(user_id) {
        return await Cart.findOne({ user_id: user_id }).populate('product_id')
    }

    static async addToCart(user_id, product_id) {
        return await Cart.findOneAndUpdate({ user_id: user_id }, { $push: { cart: product_id } }, { new: true })
    }
}

export default CartRepository