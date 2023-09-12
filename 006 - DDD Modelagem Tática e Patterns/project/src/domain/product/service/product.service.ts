import Product from "../entity/product"

export default class ProductService {
  public static increasePricesInPercents(products: Product[], percentage: number): void {
    products.forEach(product => {
      product.changePrice(product.price * ((100 + percentage) / 100))
    })
  }
}