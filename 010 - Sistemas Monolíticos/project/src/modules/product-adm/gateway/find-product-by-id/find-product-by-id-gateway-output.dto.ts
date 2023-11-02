export default interface FindProductByIdGatewayOutputDto {
  data: {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
