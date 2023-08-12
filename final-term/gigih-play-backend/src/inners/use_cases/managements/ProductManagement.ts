import type ProductRepository from '../../../outers/repositories/ProductRepository'
import Result from '../../models/value_objects/Result'
import type Product from '../../models/entities/Product'

export default class ProductManagement {
  productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  readAll = async (search?: any): Promise<Result<Product[]>> => {
    const foundProducts: Product[] = await this.productRepository.readAll(search)
    return new Result<Product[]>(
      200,
      'Product read all succeed.',
      foundProducts
    )
  }

  readAllByVideoId = async (videoId: string): Promise<Result<Product[]>> => {
    const foundProductsByVideoId: Product[] = await this.productRepository.readAllByVideoId(videoId)
    return new Result<Product[]>(
      200,

      'Product read all by video id succeed.',
      foundProductsByVideoId
    )
  }

  readOneById = async (id: string): Promise<Result<Product>> => {
    const foundProduct: Product = await this.productRepository.readOneById(id)
    return new Result<Product>(
      200,
      'Product read one by id succeed.',
      foundProduct
    )
  }

  createOne = async (item: any): Promise<Result<Product>> => {
    const createdProduct: Product = await this.productRepository.createOne(item)
    return new Result<Product>(
      201,
      'Product create one succeed.',
      createdProduct
    )
  }

  patchOneById = async (id: string, item: any): Promise<Result<Product>> => {
    const patchedProduct: Product = await this.productRepository.patchOneById(id, item)
    return new Result<Product>(
      200,
      'Product patch one by id succeed.',
      patchedProduct
    )
  }

  deleteOneById = async (id: string): Promise<Result<Product>> => {
    const deletedProduct: Product = await this.productRepository.deleteOneById(id)
    return new Result<Product>(
      200,
      'Product delete one by id succeed.',
      deletedProduct
    )
  }
}
