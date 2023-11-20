import AddClientUseCase from "./add-client.usecase";

const mockRepository = () => ({
  add: jest.fn(),
  findById: jest.fn(),
});

describe('AddClientUsecase', () => {
  it ('should add a client', async () => {
    const repository = mockRepository();
    const usecase = new AddClientUseCase(repository);
    const client = {
      name: 'any_name',
      email: 'any_email',
      document: 'any_document',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
    };
    const output = await usecase.execute(client);
    expect(repository.add).toHaveBeenCalledWith({
      ...client,
      id: expect.any(String),
    });
    expect(output.id).toBeDefined();
    expect(output.name).toBe(client.name);
    expect(output.email).toBe(client.email);
    expect(output.document).toBe(client.document);
    expect(output.city).toBe(client.city);
    expect(output.state).toBe(client.state);
    expect(output.zipCode).toBe(client.zipCode);
    expect(output.street).toBe(client.street);
    expect(output.number).toBe(client.number);
    expect(output.complement).toBe(client.complement);
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  })
});