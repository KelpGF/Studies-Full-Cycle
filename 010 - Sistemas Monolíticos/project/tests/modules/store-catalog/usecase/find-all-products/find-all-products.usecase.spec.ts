import FindAllProductsRepositorySpy from "./spies/find-all-products.repository.spy";
import FindAllProductsUseCase from "../../../../../src/modules/store-catalog/usecase/find-all-products/find-all-products.usecase";

const product1 = {
  id: '1',
  name: 'product 1',
  description: 'product 1 description',
  salesPrice: 10,
}

const product2 = {
  id: '2',
  name: 'product 2',
  description: 'product 2 description',
  salesPrice: 20,
}

describe('FindAllProducts UseCase Unit Test', () => {
  const makeSut = () => {
    const findAllProductsRepositoryOutput = {
      products: [product1, product2]
    };
    const findAllProductsRepositorySpy = new FindAllProductsRepositorySpy(findAllProductsRepositoryOutput);
    const sut = new FindAllProductsUseCase(findAllProductsRepositorySpy);

    return { sut, findAllProductsRepositorySpy };
  };

  it('should return a list of all products', async () => {
    const { sut, findAllProductsRepositorySpy } = makeSut();

    const output = await sut.execute();

    expect(findAllProductsRepositorySpy.timesCalled()).toBe(1);
    expect(findAllProductsRepositorySpy.calledWith()).toBeUndefined()
    expect(output).toEqual({
      products: [product1, product2]
    });
  });
});