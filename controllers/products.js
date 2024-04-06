import { ProductModel } from '../models/product.js'
import { validateProduct, validatePartialProduct } from '../schemas/z_product.js'

export class productController {
  static async getAll (req, res) {
    const products = await ProductModel.getAll()
    return res.json(products)
  }

  static async create (req, res) {
    const result = validateProduct(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const newProduct = await ProductModel.create({ input: result.data })
    return res.status(201).json(newProduct)
  }

  static async update (req, res) {
    const result = validatePartialProduct(req.body)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const { id } = req.params

    const updateProduct = await ProductModel.update({ input: result.data, id })

    if (!updateProduct) return res.status(400).json({ message: 'Movie not found' })

    return res.status(200).json(updateProduct)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await ProductModel.delete({ id })

    if (!result) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
