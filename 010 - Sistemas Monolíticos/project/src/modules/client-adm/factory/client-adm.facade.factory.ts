import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/sequelize/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientByIdUseCase from "../usecase/find-by-id/find-by-id.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findByIdClientUseCase = new FindClientByIdUseCase(clientRepository);
    const clientAdmFacade = new ClientAdmFacade({ addClientUseCase, findByIdClientUseCase });
    return clientAdmFacade;
  }
}