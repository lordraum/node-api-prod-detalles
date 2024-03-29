import createExpressServer, { json } from 'express'
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
process.loadEnvFile()

const app = createExpressServer()
const require = createRequire(import.meta.url)
const products = require('./data.json')
const PORT = process.env.PORT ?? '4321'

app.use(json())

// getAll
app.get('/products', (req, res) => {
  res.json(products)
})

// createProduct
app.post('/products', (req, res) => {
  const {
    title,
    price,
    category,
    tags
  } = req.body

  const newProduct = {
    id: randomUUID(),
    title,
    price,
    category,
    tags: tags ?? ''
  }

  products.push(newProduct)
  res.status(201).json(newProduct)
})

// updateProduct
app.patch('/products/:id', (req, res) => {
  const { id } = req.params
  const fieldsToUpdate = req.body
  const productIndex = products.findIndex(product => product.id === id)

  if (productIndex === -1) {
    res.status(400).json({ message: 'Not found' })
  }

  const productToUpdate = products[productIndex]

  const updatedProduct = {
    ...productToUpdate,
    ...fieldsToUpdate
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
