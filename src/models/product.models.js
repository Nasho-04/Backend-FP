import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        category: {type: String, required: true},
        stock: {type: Number, required: true},
        active: {type: Boolean, required: true, default: true},
        seller_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        created_at: {type: Date, required: true, default: Date.now}
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product