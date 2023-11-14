export default interface PaymentGatewayInterface {
  save(transaction: {
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
  }>
}
