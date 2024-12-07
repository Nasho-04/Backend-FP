import ResponseBuilder from "../utils/Response.Builder.js";
import ENVIRONMENT from "../config/environment.js";
import ProductRepository from "../repositories/productRepository.js";

// TERMINAR EL UPDATE
export const getProductsController = async (req, res) => {
    try {
        const products = await ProductRepository.getAllProducts()
        if (!products) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(404)
                .setMessage('Products not found')
                .setPayload({
                    detail: 'Products not found'
                })
                .build()
            return res.json(response)
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Products found')
            .setPayload({
                details: products
            })
            .build()
        return res.json(response)
    } catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error getting products')
            .setPayload({
                detail: error.message
            })
            .build()
        return res.json(response)
    }
}

export const getProductByIdController = async (req, res) => {
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
        if (!product.active) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage('Product is not active')
                .setPayload({
                    detail: 'Product is not active'
                })
                .build()
            return res.json(response)
        }
        if (!product.stock) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage('Product is out of stock')
                .setPayload({
                    detail: 'Product is out of stock'
                })
                .build()
            return res.json(response)
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Product found')
            .setPayload({
                details: product
            })
            .build()
        return res.json(response)
    } catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error getting product')
            .setPayload({
                detail: error.message
            })
            .build()
        return res.json(response)
    }
}

export const createProductController = async (req, res) => {
    try {
        const product = req.body
        const seller_id = req.user.id

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

    if (!seller_id) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Seller id is required and must be valid')
            .setPayload({
                detail: 'Seller id is required and must be valid'
            })
            .build()
        return res.json(response)
        
    }

    if (!product.name || !isNaN(product.name)) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product name is required and must be valid')
            .setPayload({
                detail: 'Product name is required and must not be a number'
            })
            .build()
        return res.json(response)
    }

    if (!product.description || !isNaN(product.description) || product.description.length < 15) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product description is required and must be valid')
            .setPayload({
                detail: 'Product description is required, must not be a number and must be at least 15 characters long'
            })
            .build()
        return res.json(response)
    }

    if (!product.price || isNaN(product.price) || product.price < 0) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product price is required and must be valid')
            .setPayload({
                detail: 'Product price is required, must be a number and must be greater than 0'
            })
            .build()
        return res.json(response)
    }

    if (!product.image || !isNaN(product.image)) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product image is required and must be valid')
            .setPayload({
                detail: 'Product image is required and must be a valid URL'
            })
            .build()
        return res.json(response)
    }

    if (!product.stock || isNaN(product.stock) || product.stock <= 0) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product stock is required and must be valid')
            .setPayload({
                detail: 'Product stock is required, must be a number and must be greater than 0'
            })
            .build()
        return res.json(response)
    }

    if (!product.category || !isNaN(product.category)) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product category is required and must be valid')
            .setPayload({
                detail: 'Product category is required and must not be a number'
            })
            .build()
        return res.json(response)
    }

    const newProduct = {
        ...product,
        seller_id
    }

    const createdProduct = await ProductRepository.createProduct(newProduct)
    const response = new ResponseBuilder()

        .setOk(true)
        .setStatus(201)
        .setMessage('Product created')
        .setPayload({
            details: {
                newProduct
            }
        })
        .build()
    return res.json(response)

} catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error creating product')
            .setPayload({
                detail: error.message
            })
            .build()
        return res.json(response)
    }
}

export const updateProductController = async (req, res) => {
    const {product_id} = req.params
    const seller_id = req.user.id
    const product = req.body

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

    if (!seller_id) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Seller id is required and must be valid')
            .setPayload({
                detail: 'Seller id is required and must be valid'
            })
            .build()
        return res.json(response)
    }

    if (!product) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product is required')
            .setPayload({
                detail: 'Product is required'
            })
            .build()
        return res.json(response)
    }
    
    if (!product.name || !isNaN(product.name) || product.name.length < 3) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product name is required and must be valid')
            .setPayload({
                detail: 'Product name is required and must not be a number'
            })
            .build()
        return res.json(response)
    }

    if (!product.description || !isNaN(product.description) || product.description.length < 15) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product description is required and must be valid')
            .setPayload({
                detail: 'Product description is required, must not be a number and must be at least 15 characters long'
            })
            .build()
        return res.json(response)
    }

    if (!product.price || isNaN(product.price) || product.price < 0) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product price is required and must be valid')
            .setPayload({
                detail: 'Product price is required, must be a number and must be greater than 0'
            })
            .build()
        return res.json(response)
    }

    if (!product.image) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product image is required and must be valid')
            .setPayload({
                detail: 'Product image is required and must be a valid URL'
            })
            .build()
        return res.json(response)
    }

    if (!product.stock || isNaN(product.stock) || product.stock <= 0) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product stock is required and must be valid')
            .setPayload({
                detail: 'Product stock is required, must be a number and must be greater than 0'
            })
            .build()
        return res.json(response)
    }

    if (!product.category) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Product category is required and must be valid')
            .setPayload({
                detail: 'Product category is required and must not be a number'
            })
            .build()
        return res.json(response)
    }

    const productToUpdate = await ProductRepository.getProductById(product_id)
    if (!productToUpdate) {
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

    if (productToUpdate.seller_id != seller_id) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage('Unauthorized')
            .setPayload({
                detail: 'Unauthorized'
            })
            .build()
        return res.json(response)
    }

    const updatedProduct = await ProductRepository.updateProduct(product_id, product)
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Product updated successfully')
        .setPayload({
            details: {
                updatedProduct
            }
        })
        .build()
    return res.json(response)
}

export const deleteProductController = async (req, res) => {
    const {product_id} = req.params
    const seller_id = req.user.id
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

    const product = await ProductRepository.getProductById(product_id)
    console.log(seller_id)
    console.log(product.seller_id)
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

    if (product.seller_id != seller_id) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage('Unauthorized')
            .setPayload({
                detail: 'Unauthorized'
            })
            .build()
        return res.json(response)
    }

    await ProductRepository.deleteProduct(product_id)
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Product deleted successfully')
        .setPayload({
            detail: 'Product deleted successfully'
        })
        .build()
    return res.json(response)
}