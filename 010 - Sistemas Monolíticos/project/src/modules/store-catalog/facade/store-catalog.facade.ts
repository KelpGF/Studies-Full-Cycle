import FindAllProductsUseCaseInterface from "../usecase/find-all-products/find-all-products.usecase.interface";
import { FindProductByIdUseCaseInterface } from "../usecase/find-product-by-id";
import StoreCatalogFacadeInterface, { FindAllProductsOutput, FindProductByIdInput, FindProductByIdOutput } from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCaseInterface,
    private readonly findAllProductsUseCase: FindAllProductsUseCaseInterface,
  ) {}

  async findProductById(input: FindProductByIdInput): Promise<FindProductByIdOutput> {
    const product = await this.findProductByIdUseCase.execute(input);
    return { product }
  }

  async findAllProducts(): Promise<FindAllProductsOutput> {
    return await this.findAllProductsUseCase.execute(undefined);
  }
}
