import InvoiceGatewayInterface from "../../gateway/invoice.gateway"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const mockInvoice = () => ({
  name: 'any_name',
  document: 'any_document',
  street: 'any_street',
  number: 'any_number',
  complement: 'any_complement',
  city: 'any_city',
  state: 'any_state',
  zipCode: 'any_zipCode',
  items: [
    {
      id: 'any_id',
      name: 'any_name',
      price: 10,
    },
    {
      id: 'any_id2',
      name: 'any_name2',
      price: 20,
    },
  ],
})

const mockRepository = () => ({
  findById: jest.fn(),
  save: jest.fn(),
})

describe('Invoice UseCase Unit Test', () => {
  let sut: GenerateInvoiceUseCase
  let repositoryStub: InvoiceGatewayInterface

  beforeEach(() => {
    repositoryStub = mockRepository()
    sut = new GenerateInvoiceUseCase(repositoryStub)
  })

  it('should generate a invoice', async () => {
    const input = mockInvoice()

    const output = await sut.execute(input);

    expect(repositoryStub.save).toHaveBeenCalledWith({
      id: expect.any(String),
      name: input.name,
      document: input.document,
      address: {
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      },
      items: input.items.map(item => ({
        id: expect.any(String),
        name: item.name,
        price: item.price,
      })),
      total: 30,
      createdAt: expect.any(Date),
    })

    expect(output.id).toBeTruthy()
    expect(output.name).toBe(input.name)
    expect(output.document).toBe(input.document)
    expect(output.street).toBe(input.street)
    expect(output.number).toBe(input.number)
    expect(output.complement).toBe(input.complement)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.zipCode).toBe(input.zipCode)
    expect(output.total).toBe(30)
    expect(output.items[0].id).toBeTruthy()
    expect(output.items[0].name).toBe(input.items[0].name)
    expect(output.items[0].price).toBe(input.items[0].price)
    expect(output.items[1].id).toBeTruthy()
    expect(output.items[1].name).toBe(input.items[1].name)
    expect(output.items[1].price).toBe(input.items[1].price)
  })
})
