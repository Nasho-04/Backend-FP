import mongoose from "mongoose";

const cartObjectSchema = mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
    }
)

const CartObject = mongoose.model('Cart', cartObjectSchema)

export default CartObject