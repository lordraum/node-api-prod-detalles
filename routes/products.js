import { Router } from 'express'
import { productController } from '../controllers/products.js'

export const productsRouter = Router()

// getAll
productsRouter.get('/', productController.getAll)

// createProduct
productsRouter.post('/', productController.create)

// updateProduct
productsRouter.patch('/:id', productController.update)

// delete product
productsRouter.delete('/:id', productController.delete)
