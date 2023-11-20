import IdVo from "../../../shared/domain/value-object/id.vo";
import ClientEntity from "../../domain/entity/client.entity";
import FindClientByIdUseCase from "./find-by-id.usecase";

const mockId = new IdVo()
const clientMock = new ClientEntity({
  id: mockId,
  name: 'any_name',
  email: 'any_email',
  document: 'any_document',
  city: 'any_city',
  state: 'any_state',
  zipCode: 'any_zipCode',
  street: 'any_street',
  number: 'any_number',
  complement: 'any_complement',
})

const mockRepository = () => ({
  add: jest.fn(),
  findById: jest.fn().mockResolvedValue({
    id: clientMock.id.value,
    name: clientMock.name,
    email: clientMock.email,
    document: clientMock.document,
    street: clientMock.street,
    number: clientMock.number,
    complement: clientMock.complement,
    city: clientMock.city,
    state: clientMock.state,
    zipCode: clientMock.zipCode,
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
      document: clientMock.document,
      street: clientMock.street,
      number: clientMock.number,
      complement: clientMock.complement,
      city: clientMock.city,
      state: clientMock.state,
      zipCode: clientMock.zipCode,
      createdAt: clientMock.createdAt,
      updatedAt: clientMock.updatedAt
    })
  })
})
