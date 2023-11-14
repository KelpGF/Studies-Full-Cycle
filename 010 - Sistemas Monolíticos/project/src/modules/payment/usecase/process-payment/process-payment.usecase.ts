import IdVo from "../../../shared/domain/value-object/id.vo";
import TransactionEntity from "../../domain/entity/transaction.entity";
import PaymentGatewayInterface from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";
import ProcessPaymentUseCaseInterface from "./process-payment.usecase.interface";

export default class ProcessPaymentUseCase implements ProcessPaymentUseCaseInterface {
  constructor(private readonly paymentGateway: PaymentGatewayInterface) {}

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new TransactionEntity({
      orderId: new IdVo(input.orderId),
      amount: input.amount,
    });
    transaction.process();

    const paymentGatewayInput = {
      id: transaction.id.value,
      orderId: transaction.orderId.value,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
    const persistTransaction = await this.paymentGateway.save(paymentGatewayInput);

    return {
      transactionId: persistTransaction.transactionId,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    }
  }
} 