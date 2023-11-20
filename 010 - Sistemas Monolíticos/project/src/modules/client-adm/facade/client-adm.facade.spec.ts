import { Sequelize } from "sequelize-typescript"
import { sequelizeInMemory } from "../../../../tests/shared/database/sequelize-in-memory";
import { ClientModel } from "../repository/sequelize/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe('ClientRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([ClientModel]);
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should find a client by id', async () => {
    const sut = ClientAdmFacadeFactory.create();
    ClientModel.create({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      document: 'any_document',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const output = await sut.findById({ id: 'any_id' });

    expect(output.id).toBe('any_id');
    expect(output.name).toBe('any_name');
    expect(output.email).toBe('any_email');
    expect(output.document).toBe('any_document');
    expect(output.city).toBe('any_city');
    expect(output.state).toBe('any_state');
    expect(output.zipCode).toBe('any_zipCode');
    expect(output.street).toBe('any_street');
    expect(output.number).toBe('any_number');
    expect(output.complement).toBe('any_complement');
    expect(output.createdAt).toBeTruthy();
    expect(output.updatedAt).toBeTruthy();
  })

  it('should create a client', async () => {
    const sut = ClientAdmFacadeFactory.create();
    const input = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      document: 'any_document',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
    }

    await sut.add(input);

    const clientModel = await ClientModel.findByPk('any_id');

    expect(clientModel.id).toBe('any_id');
    expect(clientModel.name).toBe('any_name');
    expect(clientModel.email).toBe('any_email');
    expect(clientModel.city).toBe('any_city');
    expect(clientModel.state).toBe('any_state');
    expect(clientModel.zipCode).toBe('any_zipCode');
    expect(clientModel.street).toBe('any_street');
    expect(clientModel.number).toBe('any_number');
    expect(clientModel.complement).toBe('any_complement');
    expect(clientModel.createdAt).toBeTruthy();
    expect(clientModel.updatedAt).toBeTruthy();
  })
})
