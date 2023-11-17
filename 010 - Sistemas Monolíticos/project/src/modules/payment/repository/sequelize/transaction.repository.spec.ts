import { Sequelize } from "sequelize-typescript"
import { sequelizeInMemory } from "../../../../../tests/shared/database/sequelize-in-memory";
import TransactionRepository from "./transaction.repository";
import TransactionModel from "./transaction.model";

describe('ClientRepository', () => {
  let sequelize: Sequelize;
  let sut: TransactionRepository;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([TransactionModel]);
    sut = new TransactionRepository();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it ('should save a transaction', async () => {
    const input = {
      id: '123',
      orderId: '456',
      amount: 100,
      status: 'approved',
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    }

    const output = await sut.save(input);

    expect(output).toEqual({
      transactionId: "123",
      orderId: "456",
      amount: 100,
      status: "approved",
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    });
  })
})