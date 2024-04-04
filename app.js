import createExpressServer, { json } from 'express'
import { productsRouter } from './routes/products.js'
import { corsMiddleware } from './middlewares/cors.js'

process.loadEnvFile()

const app = createExpressServer()
const PORT = process.env.PORT ?? '4321'

app.use(json())
app.use(corsMiddleware())

app.use('/products', productsRouter)

app.use((req, res) => res.send('<h1>Error 404: Recurso no encontrado</h1>'))

app.listen(PORT, () => console.log(`App lanzada en el puerto ${PORT}`))
