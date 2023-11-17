import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model";
import { sequelizeInMemory } from "../../../../../tests/shared/database/sequelize-in-memory";
import ClientRepository from "./client.repository";

describe('ClientRepository', () => {
  let sequelize: Sequelize;
  let sut: ClientRepository;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([ClientModel]);
    sut = new ClientRepository();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should find a client by id', async () => {
    const clientProps = {      
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const client = await ClientModel.create(clientProps);

    const clientFound = await sut.findById(client.id);

    expect(clientFound).toEqual({
      id: clientProps.id,
      name: clientProps.name,
      email: clientProps.email,
      address: clientProps.address,
      createdAt: clientProps.createdAt,
      updatedAt: clientProps.updatedAt
    })
  })

  it('should create a client', async () => {
    await sut.add({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    });

    const clientFound = await ClientModel.findByPk('any_id');

    expect(clientFound.id).toEqual('any_id');
    expect(clientFound.name).toEqual('any_name');
    expect(clientFound.email).toEqual('any_email');
    expect(clientFound.address).toEqual('any_address');
    expect(clientFound.createdAt).toBeTruthy();
    expect(clientFound.updatedAt).toBeTruthy();
  })
})