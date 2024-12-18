import Product from "../models/product.models.js";

class ProductRepository {
    static async getAllProducts() {
        return await Product.find()
    }

    static async getProductById(id) {
        return await Product.findById(id)
    }

    static async createProduct(product) {
        return await Product.create(product)
    }

    static async updateProduct(id, product) {
        return await Product.findByIdAndUpdate(id, product)
    }

    static async deleteProduct(id) {
        return await Product.findByIdAndDelete(id)
    }

    static async addToCart(user_id, product_id) {
        return await Product.findOneAndUpdate({ user_id: user_id }, { $push: { cart: product_id } }, { new: true })
    }
}

export default ProductRepository