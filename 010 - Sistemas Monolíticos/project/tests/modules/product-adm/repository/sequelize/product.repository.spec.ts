import { Sequelize } from "sequelize-typescript";
import { mockProductProps } from "../../domain/product-props.mock";
import ProductRepository from "../../../../../src/modules/product-adm/repository/sequelize/product.repository"
import ProductModel from "../../../../../src/modules/product-adm/repository/sequelize/product.model"
import ProductEntity from "../../../../../src/modules/product-adm/domain/entity/product.entity";
import { sequelizeInMemory } from "../../../../shared/database/sequelize-in-memory";

describe("Product Repository Unit Test", () => {
  let sequelize: Sequelize;
  let sut: ProductRepository;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([ProductModel]);
    sut = new ProductRepository();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  describe('add()', () => {
    it("should create a product", async () => {
      const productProps = mockProductProps();
      const product = new ProductEntity({
        name: productProps.name,
        description: productProps.description,
        purchasePrice: productProps.purchasePrice,
        stock: productProps.stock,
      });

      const input = {
        product: {
          id: product.id.value,
          name: product.name,
          description: product.description,
          purchasePrice: product.purchasePrice,
          stock: product.stock,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }
      }
      await sut.add(input);

      const productCreated = await ProductModel.findOne({ where: { id: product.id.value } }) as ProductModel;
      expect(product.id.value).toBe(productCreated.id);
      expect(product.name).toBe(productCreated.name);
      expect(product.description).toBe(productCreated.description);
      expect(product.purchasePrice).toBe(productCreated.purchasePrice);
      expect(product.stock).toBe(productCreated.stock);
    });
  })

  describe('findById()', () => {
    it("should return a product", async () => {
      ProductModel.create({
        id: "1",
        name: "name",
        description: "description",
        purchasePrice: 1,
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input = { id: "1" };
      const output = await sut.findById(input);

      expect(output.product?.id).toBe("1");
      expect(output.product?.name).toBe("name");
      expect(output.product?.description).toBe("description");
      expect(output.product?.purchasePrice).toBe(1);
      expect(output.product?.stock).toBe(1);
    });
  })
})