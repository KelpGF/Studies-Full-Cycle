import FindProductByIdGatewaySpy from "./spies/find-product-by-id.repository.spy";
import { FindProductByIUseCase } from "../../../../../src/modules/product-adm/usecase/find-product-by-id"

describe('FindProductByI UseCase Unit Test', () => {
  const makeSut = () => {
    const findProductByIdGatewaySpy = new FindProductByIdGatewaySpy();
    const sut = new FindProductByIUseCase(findProductByIdGatewaySpy);
    return {sut, findProductByIdGatewaySpy};
  }

  it('should get a stock of a product', async () => {
    const { sut, findProductByIdGatewaySpy } = makeSut();
    const input = { productId: '1' };
    const output = await sut.execute(input);
    expect(findProductByIdGatewaySpy.timesCalled()).toBe(1);
    expect(findProductByIdGatewaySpy.calledWith()).toEqual({ id: '1' });
    expect(output.productId).toBe('1');
    expect(output.stock).toBe(10);
  });
});
