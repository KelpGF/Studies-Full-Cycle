import IdVo from "../../../shared/domain/value-object/id.vo";
import ClientEntity from "../../domain/entity/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";
import AddClientUseCaseInterface from "./add-client.usecase.interface";

export default class AddClientUseCase implements AddClientUseCaseInterface {
  constructor(private readonly clientGateway: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new IdVo(input.id),
      name: input.name,
      email: input.email,
      address: input.address,
    }

    const client = new ClientEntity(props);
    await this.clientGateway.add({
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address
    });

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}
