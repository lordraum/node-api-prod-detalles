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
  res.json(products)
})

app.use((req, res) => res.send('<h1>Error 404: Recurso no encontrado</>'))

app.listen(PORT, () => console.log(`App lanzada en el puerto ${PORT}`))
