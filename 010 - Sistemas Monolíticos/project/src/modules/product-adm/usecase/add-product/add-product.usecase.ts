import IdVo from "../../../shared/domain/value-object/id.vo";
import ProductEntity from "../../domain/entity/product.entity";
import { AddProductGateway } from "../../gateway/add-product";
import AddProductUseCaseInput from "./add-product-usecase-input.dto";
import AddProductUseCaseOutput from "./add-product-usecase-ouput.dto";
import AddProductUseCaseInterface from "./add-product.usecase.interface";

export default class AddProductUseCase implements AddProductUseCaseInterface {
  constructor(
    private readonly addProductGateway: AddProductGateway
  ) {}

  async execute(input: AddProductUseCaseInput): Promise<AddProductUseCaseOutput> {
    const productProps = {
      id: new IdVo(input.product.id),
      name: input.product.name,
      description: input.product.description,
      purchasePrice: input.product.purchasePrice,
      stock: input.product.stock
    }
    const product = new ProductEntity(productProps);

    const addProductInput = {
      product: {
        id: product.id.value,
        name: product.name,
        description: product.description,
        purchasePrice: product.purchasePrice,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    }
    await this.addProductGateway.add(addProductInput);

    return {
      product: {
        id: product.id.value,
        name: product.name,
        description: product.description,
        purchasePrice: product.purchasePrice,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    }
  }
}