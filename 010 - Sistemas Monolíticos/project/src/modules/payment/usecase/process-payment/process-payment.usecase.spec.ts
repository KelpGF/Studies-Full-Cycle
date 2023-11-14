import IdVo from "../../../shared/domain/value-object/id.vo"
import TransactionEntity from "../../domain/entity/transaction.entity"
import ProcessPaymentUseCase from "./process-payment.usecase"

const transaction = new TransactionEntity({
  id: new IdVo("123"),
  orderId: new IdVo("456"),
  amount: 100,
})

const mockRepository = () => ({
  save: jest.fn().mockResolvedValue({
    transactionId: "123",
    orderId: "456",
    amount: 100,
    status: "approved",
    createdAt: new Date('2021-01-01T00:00:00.000Z'),
    updatedAt: new Date('2021-01-01T00:00:00.000Z'),
  }),
})

describe('ProcessPaymentUseCase', () => {
  it ('should process payment', async () => {
    const repository = mockRepository()
    const sut = new ProcessPaymentUseCase(repository)

    const input = {
      orderId: transaction.orderId.value,
      amount: transaction.amount,
    }
    const output = await sut.execute(input)

    expect(repository.save).toHaveBeenCalledWith({
      id: expect.any(String),
      orderId: '456',
      amount: 100,
      status: 'approved',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(output).toEqual({
      transactionId: "123",
      orderId: "456",
      amount: 100,
      status: "approved",
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    })
  })

  it ('should decline a transaction', async () => {
    const repository = mockRepository()
    repository.save.mockResolvedValue({
      transactionId: "123",
      orderId: "456",
      amount: 99,
      status: "declined",
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    })
    const sut = new ProcessPaymentUseCase(repository)

    const input = {
      orderId: transaction.orderId.value,
      amount: transaction.amount,
    }
    const output = await sut.execute(input)

    expect(output).toEqual({
      transactionId: "123",
      orderId: "456",
      amount: 99,
      status: "declined",
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    })
  })
})