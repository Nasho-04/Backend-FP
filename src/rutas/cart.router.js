import express from 'express'
import { getCartController, addToCartController, removeFromCartController } from '../controllers/cartController.js'
import { verifyApikeyMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middlewares.js'

const cartRouter = express.Router()

cartRouter.get('/', getCartController)

cartRouter.post('/:product_id', verifyTokenMiddleware([]), addToCartController)

cartRouter.delete('/:product_id', verifyTokenMiddleware([]), removeFromCartController)

export default cartRouter