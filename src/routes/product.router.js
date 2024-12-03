import express from 'express'
import { getProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from '../controllers/productsController.js'
import { verifyApikeyMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middlewares.js'

const productRouter = express.Router()

productRouter.get('/', getProductsController)

productRouter.get('/:product_id', getProductByIdController)

productRouter.post('/', verifyTokenMiddleware([]), createProductController)

productRouter.put('/edit/:product_id', verifyTokenMiddleware([]), updateProductController)

productRouter.delete('/:product_id', verifyTokenMiddleware([]), deleteProductController)

export default productRouter