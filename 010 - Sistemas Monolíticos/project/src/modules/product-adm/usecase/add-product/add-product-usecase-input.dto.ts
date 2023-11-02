export default interface AddProductUseCaseInput {
  product: {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
  }
}
