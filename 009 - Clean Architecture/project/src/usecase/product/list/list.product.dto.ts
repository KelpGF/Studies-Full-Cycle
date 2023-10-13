export interface InputListProductDTO {}

export interface OutputListProductDTO {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
}
