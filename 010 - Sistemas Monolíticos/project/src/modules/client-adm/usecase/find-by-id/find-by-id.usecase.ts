import ClientGateway from "../../gatewat/client.gateway";
import { FindByIdInputDto, FindByIdOutputDto } from "./find-by-id.usecase.dto";
import FindClientByIdUseCaseInterface from "./find-by-id.usecase.interface";

export default class FindClientByIdUseCase implements FindClientByIdUseCaseInterface {
  constructor(private readonly clientGateway: ClientGateway) {}

  async execute(input: FindByIdInputDto): Promise<FindByIdOutputDto> {
    const client = await this.clientGateway.findById(input.id);
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}