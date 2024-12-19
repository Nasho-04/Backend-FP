import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
    }
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart