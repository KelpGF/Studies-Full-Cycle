import Product from "../entity/product"
import ProductService from "./product.service"

describe("ProductService", () => {
  it ("should change the prices of all products", () => {
    const product1 = new Product("p1", "Product 1", 100)
    const product2 = new Product("p2", "Product 2", 200)
    const products = [product1, product2]

    ProductService.increasePricesInPercents(products, 100)

    expect(product1.price).toBe(200)
    expect(product2.price).toBe(400)
  })
})