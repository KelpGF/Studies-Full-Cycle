import { Sequelize } from "sequelize-typescript";
import { sequelizeInMemory } from "../../../../tests/shared/database/sequelize-in-memory";
import PaymentFacadeFactory from "../factory/payment.facade.factory"
import ProcessPaymentFacadeInterface from "./facade.interface";
import TransactionModel from "../repository/sequelize/transaction.model";

describe('PaymentFacade', () => {
  let sequelize: Sequelize;
  let sut: ProcessPaymentFacadeInterface;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([TransactionModel]);
    sut = PaymentFacadeFactory.create();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should save a transaction', async () => {
    const input = {
      orderId: '456',
      amount: 100,
    }

    const output = await sut.processPayment(input);

    expect(output.transactionId).toBeTruthy();
    expect(output.orderId).toEqual('456');
    expect(output.amount).toEqual(100);
    expect(output.status).toEqual('approved');
    expect(output.createdAt).toBeTruthy();
    expect(output.updatedAt).toBeTruthy();
  })
})