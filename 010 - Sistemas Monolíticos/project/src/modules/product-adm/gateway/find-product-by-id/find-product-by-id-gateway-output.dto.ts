export default interface FindProductByIdGatewayOutputDto {
  product: {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
