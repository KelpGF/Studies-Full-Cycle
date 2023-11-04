import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/sequelize/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductByIdUseCase } from "../usecase/find-product-by-id";

export default class StoreCatalogFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);

    return new StoreCatalogFacade(findProductByIdUseCase, findAllProductsUseCase);
  }
}
