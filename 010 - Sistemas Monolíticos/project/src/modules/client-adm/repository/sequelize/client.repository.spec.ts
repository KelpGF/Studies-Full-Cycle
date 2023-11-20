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
      document: 'any_document',
      email: 'any_email',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const client = await ClientModel.create(clientProps);

    const clientFound = await sut.findById(client.id);

    expect(clientFound).toEqual({
      id: clientProps.id,
      name: clientProps.name,
      document: clientProps.document,
      email: clientProps.email,
      city: clientProps.city,
      state: clientProps.state,
      zipCode: clientProps.zipCode,
      street: clientProps.street,
      number: clientProps.number,
      complement: clientProps.complement,
      createdAt: clientProps.createdAt,
      updatedAt: clientProps.updatedAt
    })
  })

  it('should create a client', async () => {
    await sut.add({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      document: 'any_document',
    });

    const clientFound = await ClientModel.findByPk('any_id');

    expect(clientFound.id).toEqual('any_id');
    expect(clientFound.name).toEqual('any_name');
    expect(clientFound.email).toEqual('any_email');
    expect(clientFound.city).toEqual('any_city');
    expect(clientFound.state).toEqual('any_state');
    expect(clientFound.zipCode).toEqual('any_zipCode');
    expect(clientFound.street).toEqual('any_street');
    expect(clientFound.number).toEqual('any_number');
    expect(clientFound.complement).toEqual('any_complement');
    expect(clientFound.document).toEqual('any_document');
    expect(clientFound.createdAt).toBeTruthy();
    expect(clientFound.updatedAt).toBeTruthy();
  })
})