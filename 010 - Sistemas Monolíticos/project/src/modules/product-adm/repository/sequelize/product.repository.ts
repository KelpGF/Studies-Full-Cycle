import ProductModel from "./product.model";
import { AddProductGateway, AddProductGatewayInput } from "../../gateway/add-product";
import {
  FindProductByIdGatewayInput,
  FindProductByIdGatewayOutput,
  FindProductByIdGateway
} from "../../gateway/find-product-by-id";

export default class ProductRepository implements AddProductGateway, FindProductByIdGateway {
  async add(input: AddProductGatewayInput): Promise<void> {
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

  async findById(input: FindProductByIdGatewayInput): Promise<FindProductByIdGatewayOutput> {
    const result = await ProductModel.findOne({ where: { id: input.id } });

    if (!result) return { data: null };

    return {
      data: {
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