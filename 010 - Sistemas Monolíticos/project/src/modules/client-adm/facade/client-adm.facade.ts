import AddClientUseCaseInterface from "../usecase/add-client/add-client.usecase.interface";
import FindClientByIdUseCaseInterface from "../usecase/find-by-id/find-by-id.usecase.interface";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto, ClientAdmFacadeInterface, FindByIdFacadeInputDto, FindByIdFacadeOutputDto } from "./client-adm.facade.interface";

type Props = {
  addClientUseCase: AddClientUseCaseInterface;
  findByIdClientUseCase: FindClientByIdUseCaseInterface;
}
export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private addClientUseCase: AddClientUseCaseInterface;
  private findByIdClientUseCase: FindClientByIdUseCaseInterface;

  constructor(props: Props) {
    this.addClientUseCase = props.addClientUseCase;
    this.findByIdClientUseCase = props.findByIdClientUseCase;
  }

  async add(client: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
    const result = await this.addClientUseCase.execute({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address
    });

    return result;
  }

  async findById(input: FindByIdFacadeInputDto): Promise<FindByIdFacadeOutputDto> {
    const client = await this.findByIdClientUseCase.execute(input);
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