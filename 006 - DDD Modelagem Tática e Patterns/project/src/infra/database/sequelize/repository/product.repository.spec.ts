import { Sequelize } from "sequelize-typescript";
import ProductModel from "../model/product.model"
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe('ProductRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'p1', 10)

    await productRepository.create(product)

    const productCreated = await ProductModel.findOne({ where: { id: '1' } })

    expect(productCreated.toJSON()).toStrictEqual({
      id: +product.id,
      name: product.name,
      price: product.price
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'p1', 10)

    await productRepository.create(product)

    product.changeName('p01')
    product.changePrice(11)

    await productRepository.update(product)

    const productUpdated = await ProductModel.findOne({ where: { id: '1' } })

    expect(productUpdated.toJSON()).toStrictEqual({
      id: +product.id,
      name: product.name,
      price: product.price
    })
  })

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'p1', 10)

    await productRepository.create(product)

    const productFound = await productRepository.findById('1')

    expect(product).toStrictEqual(productFound)
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'p1', 10)
    const product2 = new Product('2', 'p2', 20)

    Promise.all([
      productRepository.create(product1),
      productRepository.create(product2)
    ])

    const productsFound = await productRepository.findAll()
    const products = [product1, product2]

    expect(productsFound).toEqual(products)
  })
})
