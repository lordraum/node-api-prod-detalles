import { readJSON } from '../utils.js'
import { randomUUID } from 'crypto'

const products = readJSON('./products.json')

export class ProductModel {
  //
  static async getAll () {
    return products
  }

  static async create ({ input }) {
    const newProduct = {
      id: randomUUID(),
      ...input
    }
    products.push(newProduct)
    return newProduct
  }

  static async update ({ input, id }) {
    const productIndex = products.findIndex(product => product.id === id)

    if (productIndex === -1) return false

    products[productIndex] = {
      ...products[productIndex],
      ...input
    }

    return products[productIndex]
  }

  static async delete ({ id }) {
    const productIndex = products.findIndex(product => product.id === id)

    if (productIndex === -1) {
      return false
    }

    products.splice(productIndex, 1)

    return true
  }

  //
}
