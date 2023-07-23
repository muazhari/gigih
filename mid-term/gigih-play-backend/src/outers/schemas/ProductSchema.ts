import { model, Schema } from 'mongoose'
import type Product from '../../inners/models/entities/Product'

const productSchema = new Schema<Product>({
  title: {
    type: Schema.Types.String
  },
  price: {
    type: Schema.Types.Number
  },
  linkUrl: {
    type: Schema.Types.String
  }
},
{
  versionKey: false
})

export default model<Product>('products', productSchema)
