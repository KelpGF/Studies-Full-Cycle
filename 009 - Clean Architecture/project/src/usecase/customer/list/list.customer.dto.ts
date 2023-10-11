export interface InputListCustomerDTO {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zipCode: string;
  };
};

export interface OutputListCustomerDTO {
  customers: Customer[];
}
