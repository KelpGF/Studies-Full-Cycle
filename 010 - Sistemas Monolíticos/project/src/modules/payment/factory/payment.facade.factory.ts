import ProcessPaymentFacadeInterface from "../facade/facade.interface";
import ProcessPaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/sequelize/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
  static create(): ProcessPaymentFacadeInterface {
    const repository = new TransactionRepository()
    const processPaymentUseCase = new ProcessPaymentUseCase(repository)
    
    return new ProcessPaymentFacade(processPaymentUseCase);
  }
}
