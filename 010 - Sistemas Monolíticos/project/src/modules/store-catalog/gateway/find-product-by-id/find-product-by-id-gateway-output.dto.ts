export default interface FindProductByIdGatewayOutputDto {
  product: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  } | null;
}
