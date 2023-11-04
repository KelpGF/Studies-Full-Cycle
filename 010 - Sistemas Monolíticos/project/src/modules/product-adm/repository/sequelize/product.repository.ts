import ProductModel from "./product.model";
import { AddProductGateway, AddProductGatewayInputDto } from "../../gateway/add-product";
import {
  FindProductByIdGatewayInputDto,
  FindProductByIdGatewayOutputDto,
  FindProductByIdGateway
} from "../../gateway/find-product-by-id";

export default class ProductRepository implements AddProductGateway, FindProductByIdGateway {
  async add(input: AddProductGatewayInputDto): Promise<void> {
    await ProductModel.create({
      id: input.product.id,
      name: input.product.name,
      description: input.product.description,
      purchasePrice: input.product.purchasePrice,
      stock: input.product.stock,
      createdAt: input.product.createdAt,
      updatedAt: input.product.updatedAt,
    });
  }

  async findById(input: FindProductByIdGatewayInputDto): Promise<FindProductByIdGatewayOutputDto> {
    const result = await ProductModel.findOne({ where: { id: input.id } });

    if (!result) return { product: null };

    return {
      product: {
        id: result.id,
        name: result.name,
        description: result.description,
        purchasePrice: result.purchasePrice,
        stock: result.stock,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    };
  }
}