import FindProductByIdGatewaySpy from "./spies/find-product-by-id.repository.spy";
import { FindProductByIdUseCase } from "../../../../../src/modules/store-catalog/usecase/find-product-by-id"
import { mockProductProps } from "../../domain/product-props.mock";

describe('FindProductById UseCase Unit Test', () => {
  const makeSut = () => {
    const findProductByIdGatewaySpy = new FindProductByIdGatewaySpy();
    const sut = new FindProductByIdUseCase(findProductByIdGatewaySpy);
    return {sut, findProductByIdGatewaySpy};
  }

  it('should return a product', async () => {
    const { sut, findProductByIdGatewaySpy } = makeSut();
    const input = { productId: '1' };
    const output = await sut.execute(input);
    expect(findProductByIdGatewaySpy.timesCalled()).toBe(1);
    expect(findProductByIdGatewaySpy.calledWith()).toEqual({ id: '1' });
    expect(output).toEqual(mockProductProps());
  });
});
