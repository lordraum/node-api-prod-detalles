import { z } from 'zod'

const productSchema = z.object({
  title: z.string().min(5).max(50),
  price: z.number(),
  category: z.string().min(5).max(50),
  tags: z.array(z.enum(['chocolates', 'mug', 'hombre', 'mujer', 'flores']))
})

export const validateProduct = (input) => productSchema.safeParse(input)

export const validatePartialProduct = (input) => productSchema.partial().safeParse(input)
