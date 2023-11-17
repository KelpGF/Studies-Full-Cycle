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
      address: 'any_address',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const output = await sut.findById({ id: 'any_id' });

    expect(output.id).toBe('any_id');
    expect(output.name).toBe('any_name');
    expect(output.email).toBe('any_email');
    expect(output.address).toBe('any_address');
    expect(output.createdAt).toBeTruthy();
    expect(output.updatedAt).toBeTruthy();
  })

  it('should create a client', async () => {
    const sut = ClientAdmFacadeFactory.create();
    const input = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    }

    await sut.add(input);

    const clientModel = await ClientModel.findByPk('any_id');

    expect(clientModel.id).toBe('any_id');
    expect(clientModel.name).toBe('any_name');
    expect(clientModel.email).toBe('any_email');
    expect(clientModel.address).toBe('any_address');
    expect(clientModel.createdAt).toBeTruthy();
    expect(clientModel.updatedAt).toBeTruthy();
  })
})
