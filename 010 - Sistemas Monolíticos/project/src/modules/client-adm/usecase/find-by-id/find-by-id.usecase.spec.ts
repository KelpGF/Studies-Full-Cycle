import IdVo from "../../../shared/domain/value-object/id.vo";
import ClientEntity from "../../domain/entity/client.entity";
import FindClientByIdUseCase from "./find-by-id.usecase";

const mockId = new IdVo()
const clientMock = new ClientEntity({
  id: mockId,
  name: 'any_name',
  email: 'any_email',
  address: 'any_address',
})

const mockRepository = () => ({
  add: jest.fn(),
  findById: jest.fn().mockResolvedValue({
    id: clientMock.id.value,
    name: clientMock.name,
    email: clientMock.email,
    address: clientMock.address,
    createdAt: clientMock.createdAt,
    updatedAt: clientMock.updatedAt
  }),
});

describe('AddClientUsecase', () => {
  it ('should find a client', async () => {
    const input = {
      id: mockId.value
    }

    const repository = mockRepository();
    const usecase = new FindClientByIdUseCase(repository);

    const output = await usecase.execute(input);

    expect(repository.findById).toHaveBeenCalledWith(input.id);
    expect(output).toEqual({
      id: clientMock.id.value,
      name: clientMock.name,
      email: clientMock.email,
      address: clientMock.address,
      createdAt: clientMock.createdAt,
      updatedAt: clientMock.updatedAt
    })
  })
})
