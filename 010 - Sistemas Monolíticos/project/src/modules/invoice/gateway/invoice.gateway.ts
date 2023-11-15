export interface InvoiceModel {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export default interface InvoiceGatewayInterface {
  save(invoice: InvoiceModel): Promise<void>;
  findById(id: string): Promise<InvoiceModel>;
}
