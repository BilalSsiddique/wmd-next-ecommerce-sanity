import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './product'
import {categorySchema} from './category'
import { productTypeSchema } from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,categorySchema,productTypeSchema],
}
