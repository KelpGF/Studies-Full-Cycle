export default interface FindAllProductsOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[]
}
