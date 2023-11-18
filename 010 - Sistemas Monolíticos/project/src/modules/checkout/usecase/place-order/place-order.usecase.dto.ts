export interface PlaceOrderUseCaseInputDto {
  clientId: string;
  products: { id: string; }[];
}

export interface PlaceOrderUseCaseOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: { id: string; }[];
}
