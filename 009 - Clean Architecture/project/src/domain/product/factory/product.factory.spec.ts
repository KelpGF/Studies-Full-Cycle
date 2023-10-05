import Product from "../entity/product"
import ProductB from "../entity/product-b"
import ProductFactory from "./product.factory"

describe('ProductFactory', () => {
  it ('should create a product a', () => {
    const product = ProductFactory.create('a', 'Product A', 10)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product A')
    expect(product.price).toBe(10)
    expect(product).toBeInstanceOf(Product)
  })

  it ('should create a product b', () => {
    const product = ProductFactory.create('b', 'Product B', 10)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(20)
    expect(product).toBeInstanceOf(ProductB)
  })

  it ('should throw an error when product type is invalid', () => {
    expect(() => ProductFactory.create('c' as any, 'Product C', 10)).toThrowError('Invalid product type')
  })
})
