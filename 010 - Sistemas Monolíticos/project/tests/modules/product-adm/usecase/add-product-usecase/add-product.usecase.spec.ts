import AddProductGatewaySpy from "./spies/add-product-repository.spy"

import AddProductUseCase from "../../../../../src/modules/product-adm/usecase/add-product/add-product.usecase"

describe('Add Product Use Case Unit Test', () => {
  it('should add a product', async () => {
    const productRepository = new AddProductGatewaySpy()
    const sut = new AddProductUseCase(productRepository)

    const input = {
      product: {
        name: 'Product 1',
        description: 'Description 1',
        purchasePrice: 10,
        stock: 10,
      }
    }
    const output = await sut.execute(input)

    expect(productRepository.timesCalled()).toBe(1)
    expect(output.product.id).toBeDefined()
    expect(output.product.name).toBe('Product 1')
    expect(output.product.description).toBe('Description 1')
    expect(output.product.purchasePrice).toBe(10)
    expect(output.product.stock).toBe(10)
    expect(output.product.createdAt).toBeInstanceOf(Date)
    expect(output.product.updatedAt).toBeInstanceOf(Date)
  })
})