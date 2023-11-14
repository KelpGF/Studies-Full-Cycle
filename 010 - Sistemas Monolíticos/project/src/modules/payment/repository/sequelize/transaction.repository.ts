import PaymentGatewayInterface from '../../gateway/payment.gateway';
import TransactionModel from './transaction.model';

export default class TransactionRepository implements PaymentGatewayInterface {
	async save(transaction: {
		id: string;
		orderId: string;
		amount: number;
		status: string;
		createdAt: Date;
		updatedAt: Date;
	}): Promise<{
		transactionId: string;
		orderId: string;
		amount: number;
		status: string;
		createdAt: Date;
		updatedAt: Date;
	}> {
		await TransactionModel.create({
      id: transaction.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });

    return {
      transactionId: transaction.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
	}
}
