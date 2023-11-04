import { FindProductByIdGateway } from "../../gateway/find-product-by-id";
import FindProductByIdInputDto from "./find-product-by-id-input.dto";
import FindProductByIdOutputDto from "./find-product-by-id-output.dto";
import FindProductByIdUseCaseInterface from "./find-product-by-id.usecase.interface";

export default class FindProductByIdUseCase implements FindProductByIdUseCaseInterface {
  constructor(private readonly findProductByIdGateway: FindProductByIdGateway) {}

  async execute(input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto> {
    const result = await this.findProductByIdGateway.findById({ id: input.productId });

    if (!result) return null

    return {
      id: result.product.id,
      name: result.product.name,
      description: result.product.description,
      salesPrice: result.product.salesPrice,
    };
  }
}