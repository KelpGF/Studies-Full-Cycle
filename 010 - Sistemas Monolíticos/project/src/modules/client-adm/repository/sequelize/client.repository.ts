import ClientGateway from "../../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
  async add(client: { id?: string; name: string; email: string; address: string; createdAt?: Date; updatedAt?: Date; }): Promise<void> {
    await ClientModel.create({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt || new Date(),
      updatedAt: client.updatedAt || new Date()
    });
  }

  async findById(id: string): Promise<{ id: string; name: string; email: string; address: string; createdAt: Date; updatedAt: Date; }> {
    const clientModel = await ClientModel.findByPk(id);
    return {
      id: clientModel.id,
      name: clientModel.name,
      email: clientModel.email,
      address: clientModel.address,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt
    }
  }
}
