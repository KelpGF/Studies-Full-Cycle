import { FindProductByIdGateway } from "../../gateway/find-product-by-id";
import FindProductByIInputDto from "./find-product-by-id-input.dto";
import FindProductByIOutputDto from "./find-product-by-id-output.dto";
import FindProductByIUseCaseInterface from "./find-product-by-id.usecase.interface";

export default class FindProductByIUseCase implements FindProductByIUseCaseInterface {
  constructor(private readonly findProductByIdGateway: FindProductByIdGateway) {}

  async execute(input: FindProductByIInputDto): Promise<FindProductByIOutputDto> {
    const result = await this.findProductByIdGateway.findById({ id: input.productId });

    if (!result) return null

    return { productId: result.product.id, stock: result.product.stock };
  }
}