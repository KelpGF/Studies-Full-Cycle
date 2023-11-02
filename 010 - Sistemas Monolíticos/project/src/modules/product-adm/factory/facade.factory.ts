import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export default class ProductAdminFacadeFactory {
  static create(): ProductAdmFacadeInterface {
    const repository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(repository);
    const usecase = { execute: () => Promise.resolve() }
    const props = {
      addProductUseCase,
      findProductByIdUseCase: usecase
    }

    return new ProductAdmFacade(props);
  }
}