import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return { products: this.outputMapper(products) }
  }

  private outputMapper(products: Product[]) {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price
    }))
  }
}
