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
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    }

    const client = new ClientEntity(props);
    await this.clientGateway.add({
      ...props,
      id: client.id.value,
    });

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}
