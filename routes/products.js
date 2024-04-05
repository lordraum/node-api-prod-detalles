import { Router } from 'express'
import { ProductModel } from '../models/product.js'
import { validateProduct, validatePartialProduct } from '../schemas/z_product.js'

export const productsRouter = Router()

// getAll
productsRouter.get('/', async (req, res) => {
  const products = await ProductModel.getAll()
  res.json(products)
})

// createProduct
productsRouter.post('/', async (req, res) => {
  const result = validateProduct(req.body)
  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const newProduct = await ProductModel.create({ input: result.data })
  res.status(201).json(newProduct)
})

// updateProduct
productsRouter.patch('/:id', async (req, res) => {
  const result = validatePartialProduct(req.body)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = req.params

  const updateProduct = await ProductModel.update({ input: result.data, id })

  if (!updateProduct) return res.status(400).json({ message: 'Movie not found' })

  res.status(200).json(updateProduct)
})

// delete product
productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const result = await ProductModel.delete({ id })

  if (!result) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  return res.json({ message: 'Movie deleted' })
})
