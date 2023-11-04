import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../../../src/modules/store-catalog/repository/sequelize/product.repository"
import ProductModel from "../../../../../src/modules/store-catalog/repository/sequelize/product.model"
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

  describe('findAll()', () => {
    it("should return a list of all products", async () => {
      await ProductModel.create({
        id: "1",
        name: "name",
        description: "description",
        salesPrice: 100,
      });

      await ProductModel.create({
        id: "2",
        name: "name2",
        description: "description2",
        salesPrice: 200,
      });

      const output = await sut.findAll();

      expect(output).toEqual({
        products: [
          {
            id: "1",
            name: "name",
            description: "description",
            salesPrice: 100,
          },
          {
            id: "2",
            name: "name2",
            description: "description2",
            salesPrice: 200,
          },
        ],
      });
    });
  })

  describe('findById()', () => {
    it("should return a product", async () => {
      await ProductModel.create({
        id: "1",
        name: "name",
        description: "description",
        salesPrice: 100,
      });

      const output = await sut.findById({ id: "1" });

      expect(output).toEqual({
        product: {
          id: "1",
          name: "name",
          description: "description",
          salesPrice: 100,
        },
      });
    });

    it("should return null when product is not found", async () => {
      const output = await sut.findById({ id: "1" });

      expect(output).toEqual({
        product: null,
      });
    });
  })
})