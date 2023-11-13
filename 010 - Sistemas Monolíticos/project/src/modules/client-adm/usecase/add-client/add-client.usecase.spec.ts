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
      address: 'any_address',
    };
    const output = await usecase.execute(client);
    expect(repository.add).toHaveBeenCalledWith({
      name: client.name,
      email: client.email,
      address: client.address,
      id: expect.any(String),
    });
    expect(output.id).toBeDefined();
    expect(output.name).toBe(client.name);
    expect(output.email).toBe(client.email);
    expect(output.address).toBe(client.address);
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  })
});