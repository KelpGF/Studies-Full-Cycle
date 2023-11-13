export default interface ClientGateway {
  add(client: {
    id?: string;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Promise<void>;

  findById(id: string): Promise<{
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}
