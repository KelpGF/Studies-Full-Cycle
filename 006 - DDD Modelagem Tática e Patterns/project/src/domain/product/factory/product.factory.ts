import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

const makeProductByType = {
  a: (name: string, price: number) => new Product(uuid(), name, price),
  b: (name: string, price: number) => new ProductB(uuid(), name, price),
};

export default class ProductFactory {
  static create(type: 'a' | 'b', name: string, price: number): ProductInterface {
    if (!makeProductByType[type]) throw new Error("Invalid product type");

    return makeProductByType[type](name, price);
  }
}
