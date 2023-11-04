export interface FindProductByIdInput {
  productId: string;
}
export interface FindProductByIdOutput {
  product: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  } | null;
}

export interface FindAllProductsOutput {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  findProductById(input: FindProductByIdInput): Promise<FindProductByIdOutput>;
  findAllProducts(): Promise<FindAllProductsOutput>;
}
