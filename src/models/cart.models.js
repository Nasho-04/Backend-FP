import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        cart: {type: Array, required: true, default: []}
    }
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart