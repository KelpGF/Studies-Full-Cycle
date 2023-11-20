import ClientGateway from '../../gateway/client.gateway';
import { ClientModel } from './client.model';

export default class ClientRepository implements ClientGateway {
	async add(client: {
		id?: string;
		name: string;
		email: string;
		document: string;
		street: string;
		number: string;
		complement: string;
		city: string;
		state: string;
		zipCode: string;
		createdAt?: Date;
		updatedAt?: Date;
	}): Promise<void> {
		await ClientModel.create({
			id: client.id,
			name: client.name,
			email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
			createdAt: client.createdAt || new Date(),
			updatedAt: client.updatedAt || new Date(),
		});
	}

	async findById(
		id: string,
	): Promise<{
		id: string;
		name: string;
		email: string;
		document: string;
		street: string;
		number: string;
		complement: string;
		city: string;
		state: string;
		zipCode: string;
		createdAt: Date;
		updatedAt: Date;
	}> {
		const clientModel = await ClientModel.findByPk(id);
		return {
			id: clientModel.id,
			name: clientModel.name,
			email: clientModel.email,
      document: clientModel.document,
      street: clientModel.street,
      number: clientModel.number,
      complement: clientModel.complement,
      city: clientModel.city,
      state: clientModel.state,
      zipCode: clientModel.zipCode,
			createdAt: clientModel.createdAt,
			updatedAt: clientModel.updatedAt,
		};
	}
}
