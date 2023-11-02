import { Sequelize } from "sequelize";
import { sequelizeInMemory } from "../../../../shared/database/sequelize-in-memory";
import ProductModel from "../../../../../src/modules/product-adm/repository/sequelize/product.model";
import ProductAdminFacadeFactory from "../../../../../src/modules/product-adm/factory/facade.factory";
import { mockProductProps } from "../../domain/product-props.mock";

describe('ProductAdmFacade Unit Test', () => {
  let sequelize: Sequelize;
  
  const makeSut = () => {
    const productAdmFacade = ProductAdminFacadeFactory.create()
    return { productAdmFacade };
  }

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([ProductModel]);
  })

  afterEach(async () => {
    await sequelize.close();
  })

  describe('addProduct()', () => {
    it("should create a product", async () => {
      const { productAdmFacade } = makeSut();
      const input = { product: mockProductProps() }
      await productAdmFacade.addProduct(input);

      const productCreated = await ProductModel.findOne({ where: { id: "1" } }) as ProductModel;
      expect(productCreated.id).toBe('1');
      expect(productCreated.name).toBe(input.product.name);
      expect(productCreated.description).toBe(input.product.description);
      expect(productCreated.purchasePrice).toBe(input.product.purchasePrice);
      expect(productCreated.stock).toBe(input.product.stock);
    });
  })
});