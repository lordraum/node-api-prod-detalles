const newProduct = {
  title: 'Caja Feliz Día',
  price: 55000,
  category: 'Cajas Sorpresa',
  tags: [
    'chocolates',
    'mug',
    'hombre',
    'mujer'
  ]
}

const res = await fetch('http://localhost:1234/products')

const result = await res.json()

console.log(result)

const createProduct = await fetch('http://localhost:1234/products', {
  method: 'POST',
  body: JSON.stringify(newProduct),
  headers: {
    'Content-Type': 'application/json'
  }
})

const createProductResponse = await createProduct.json()

console.log(createProductResponse)
