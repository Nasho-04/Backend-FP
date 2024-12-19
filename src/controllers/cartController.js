import CartObjectRepository from "../repositories/cartRepository.js"
import ProductRepository from "../repositories/productRepository.js"
import UserRepository from "../repositories/userRepository.js"
import ResponseBuilder from "../utils/Response.Builder.js"


export const getCartController = async (req, res) => {
    try {
    const cart = await CartObjectRepository.getCart()

    if (!cart) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('Cart not found')
            .setPayload({
                detail: 'Cart not found'
            })
            .build()
        return res.json(response)
    }

    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Cart found succesfully')
        .setPayload({
            details: cart
        })
        .build()
    return res.json(response)
    } catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error getting cart')
            .setPayload({
                detail: error.message
            })
            .build()
        return res.json(response)
    }
}

export const addToCartController = async (req, res) => {
    try {
    const { product_id } = req.params
    if (!product_id) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product id is required')
            .setPayload({
                detail: 'Product id is required'
            })
            .build()
        return res.json(response)
    }
    const user_id = req.user.id
    const user = await UserRepository.getById(user_id)
    if (!user) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('User not found')
            .setPayload({
                detail: 'User not found'
            })
            .build()
        return res.json(response)
    }
    const product = await ProductRepository.getProductById(product_id)
    if (!product) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('Product not found')
            .setPayload({
                detail: 'Product not found'
            })
            .build()
        return res.json(response)
    }
    const cart = await CartObjectRepository.getCart(user_id)
    if (!cart) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('Cart not found')
            .setPayload({
                detail: 'Cart not found'
            })
            .build()
        return res.json(response)
    }
    await CartObjectRepository.addToCart(user_id, product_id)
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Product added to cart successfully')
        .setPayload({
            detail: 'Product added to cart successfully'
        })
        .build()
    return res.json(response)
    } catch (error) {    
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error adding product to cart')
            .setPayload({
                detail: error.message
            })
            .build()
        return res.json(response)
    }
}