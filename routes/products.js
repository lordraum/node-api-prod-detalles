import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'
import { validateProduct, validatePartialProduct } from '../schemas/z_product.js'

export const productsRouter = Router()

const products = readJSON('./products.json')

// getAll
productsRouter.get('/', (req, res) => {
  res.json(products)
})

// createProduct
productsRouter.post('/', (req, res) => {
  const result = validateProduct(req.body)

  console.log(result)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const newProduct = {
    id: randomUUID(),
    ...result.data
  }

  products.push(newProduct)
  res.status(201).json(newProduct)
})

// updateProduct
productsRouter.patch('/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialProduct(req.body)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const productIndex = products.findIndex(product => product.id === id)

  if (productIndex === -1) {
    res.status(400).json({ message: 'Not found' })
  }

  const productToUpdate = products[productIndex]

  const updatedProduct = {
    ...productToUpdate,
    ...result.data
  }

  products[productIndex] = updatedProduct

  res.status(200).json(updatedProduct)
})

// delete product
productsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const productIndex = products.findIndex(product => product.id === id)

  if (productIndex === -1) {
    res.status(400).json({ message: 'Not found' })
  }

  products.splice(productIndex, 1)

  res.status(200).json({ message: 'movie deleted' })
})
