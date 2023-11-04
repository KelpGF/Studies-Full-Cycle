export default interface FindAllProductsGatewayOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
