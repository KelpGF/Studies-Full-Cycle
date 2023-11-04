import ProductModel from "./product.model";
import {
  FindAllProductsGateway,
  FindAllProductsGatewayOutputDto,
} from "../../gateway/find-all-products";
import { FindProductByIdGateway, FindProductByIdGatewayInputDto, FindProductByIdGatewayOutputDto } from "../../gateway/find-product-by-id";

export default class ProductRepository implements FindAllProductsGateway, FindProductByIdGateway {
  async findAll(): Promise<FindAllProductsGatewayOutputDto> {
    const products = await ProductModel.findAll({ raw: true });

    return { products }
  }

  async findById(input: FindProductByIdGatewayInputDto): Promise<FindProductByIdGatewayOutputDto> {
    const product = await ProductModel.findByPk(input.id, { raw: true });

    if (!product) return { product: null };

    return { product };
  }
}