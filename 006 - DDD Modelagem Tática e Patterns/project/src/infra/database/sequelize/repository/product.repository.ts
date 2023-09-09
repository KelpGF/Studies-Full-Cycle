import Product from "../../../../domain/entity/product"
import ProductRepositoryInterface from "../../../../domain/repository/product-repository.interface"
import ProductModel from "../model/product.model"

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: { id: entity.id }
    })
  }

  async findById(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } })

    return new Product(String(product.id), product.name, product.price)
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()

    return products.map(product => new Product(String(product.id), product.name, product.price))
  }
}
