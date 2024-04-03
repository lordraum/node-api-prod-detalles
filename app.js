import createExpressServer, { json } from 'express'
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import cors from 'cors'

import { validateProduct, validatePartialProduct } from './schemas/z_product.js'

process.loadEnvFile()

const app = createExpressServer()
const require = createRequire(import.meta.url)
const products = require('./products.json')
const PORT = process.env.PORT ?? '4321'

const whitelist = ['http://localhost:8080', 'http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(json())

app.use(cors(corsOptions))

// getAll
app.get('/products', (req, res) => {
  res.json(products)
})

// createProduct
app.post('/products', (req, res) => {
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
app.patch('/products/:id', (req, res) => {
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
app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  const productIndex = products.findIndex(product => product.id === id)

  if (productIndex === -1) {
    res.status(400).json({ message: 'Not found' })
  }

  products.splice(productIndex, 1)

  res.status(200).json({ message: 'movie deleted' })
})

app.use((req, res) => res.send('<h1>Error 404: Recurso no encontrado</h1>'))

app.listen(PORT, () => console.log(`App lanzada en el puerto ${PORT}`))
