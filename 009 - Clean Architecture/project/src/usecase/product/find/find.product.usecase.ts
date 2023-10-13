import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}
