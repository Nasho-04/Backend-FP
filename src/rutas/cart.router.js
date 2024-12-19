import express from 'express'
import { getCartController, addToCartController } from '../controllers/cartController.js'
import { verifyApikeyMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middlewares.js'

const cartRouter = express.Router()

cartRouter.get('/', getCartController)

cartRouter.post('/:product_id', verifyTokenMiddleware([]), addToCartController)

export default cartRouter