import express from 'express'
import { getCartController, addToCartController } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.get('/', getCartController)

cartRouter.post('/:product_id', addToCartController)

export default cartRouter