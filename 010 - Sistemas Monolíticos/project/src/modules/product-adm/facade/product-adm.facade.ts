import AddProductUseCaseInterface from "../usecase/add-product/add-product.usecase.interface";
import { FindProductByIdUseCaseInterface } from "../usecase/find-product-by-id";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface ProductAdmFacadeDependencies {
  addProductUseCase: AddProductUseCaseInterface;
  findProductByIdUseCase: FindProductByIdUseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private addProductUseCase: AddProductUseCaseInterface;
  private findProductByIdUseCase: FindProductByIdUseCaseInterface;

  constructor(productAdmFacadeDependencies: ProductAdmFacadeDependencies) {
    this.addProductUseCase = productAdmFacadeDependencies.addProductUseCase;
    this.findProductByIdUseCase = productAdmFacadeDependencies.findProductByIdUseCase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    await this.addProductUseCase.execute(input);
  }

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    const result = await this.findProductByIdUseCase.execute(input);
    if (!result) return null;
    return { productId: result.productId, stock: result.stock }
  }
}
