import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import { FindProductByIdUseCase } from "../usecase/find-product-by-id";

export default class ProductAdminFacadeFactory {
  static create(): ProductAdmFacadeInterface {
    const repository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(repository);
    const findProductByIdUseCase = new FindProductByIdUseCase(repository);
    const props = {
      addProductUseCase,
      findProductByIdUseCase: findProductByIdUseCase
    }

    return new ProductAdmFacade(props);
  }
}