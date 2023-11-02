import UseCaseInterface from "../../shared/usecase/usecase.interface";
import AddProductUseCaseInterface from "../usecase/add-product/add-product.usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface ProductAdmFacadeDependencies {
  addProductUseCase: AddProductUseCaseInterface;
  findProductByIdUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private addProductUseCase: AddProductUseCaseInterface;
  private findProductByIdUseCase: UseCaseInterface<any, CheckStockFacadeOutputDto>;

  constructor(productAdmFacadeDependencies: ProductAdmFacadeDependencies) {
    this.addProductUseCase = productAdmFacadeDependencies.addProductUseCase;
    this.findProductByIdUseCase = productAdmFacadeDependencies.findProductByIdUseCase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    await this.addProductUseCase.execute(input);
  }

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this.findProductByIdUseCase.execute(input);
  }
}
