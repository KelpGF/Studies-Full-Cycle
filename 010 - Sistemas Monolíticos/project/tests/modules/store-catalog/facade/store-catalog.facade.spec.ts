import { Sequelize } from "sequelize";
import StoreCatalogFacadeFactory from '../../../../src/modules/store-catalog/factory/store-catalog-facade.factory';
import { sequelizeInMemory } from "../../../shared/database/sequelize-in-memory";
import ProductModel from "../../../../src/modules/store-catalog/repository/sequelize/product.model";
import { mockProductProps } from "../domain/product-props.mock";

describe('StoreCatalogFacade Unit Test', () => {
  let sequelize: Sequelize;

  const makeSut = () => {
    const sut = StoreCatalogFacadeFactory.create();

    return { sut };
  }
  
  beforeEach(async () => {
    sequelize = await sequelizeInMemory([ProductModel]);
  })

  afterEach(async () => {
    await sequelize.close();
  })

  describe('findProductById()', () => {
    it("should find a product by id", async () => {
      const productPros = mockProductProps()

      await ProductModel.create(productPros);

      const { sut } = makeSut();
      const input = { productId: '1' };
      const output = await sut.findProductById(input);
      expect(output.product?.id).toBe(productPros.id);
      expect(output.product?.name).toBe(productPros.name);
      expect(output.product?.description).toBe(productPros.description);
      expect(output.product?.salesPrice).toBe(productPros.salesPrice);
    });
  })

  describe('findAllProducts()', () => {
    it("should find all products", async () => {
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

      await ProductModel.create(product1);
      await ProductModel.create(product2);

      const { sut } = makeSut();
      const output = await sut.findAllProducts();
      expect(output.products).toEqual([product1, product2]);
    });
  })
});