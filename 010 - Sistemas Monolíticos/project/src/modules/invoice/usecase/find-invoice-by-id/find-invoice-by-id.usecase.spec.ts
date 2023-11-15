import InvoiceGatewayInterface from "../../gateway/invoice.gateway"
import FindInvoiceByIdUseCase from "./find-invoice-by-id.usecase"

const mockInvoiceModel = () => ({
  id: 'any_id',
  name: 'any_name',
  document: 'any_document',
  address: {
    street: 'any_street',
    number: 'any_number',
    complement: 'any_complement',
    city: 'any_city',
    state: 'any_state',
    zipCode: 'any_zipCode',
  },
  items: [
    {
      id: 'any_id',
      name: 'any_name',
      price: 10,
    },
  ],
  total: 10,
  createdAt: new Date('2021-01-01T00:00:00'),
})

const mockRepository = () => ({
  findById: jest.fn().mockResolvedValueOnce(mockInvoiceModel()),
  save: jest.fn(),
})

describe('Invoice UseCase Unit Test', () => {
  let sut: FindInvoiceByIdUseCase
  let repositoryStub: InvoiceGatewayInterface

  beforeEach(() => {
    repositoryStub = mockRepository()
    sut = new FindInvoiceByIdUseCase(repositoryStub)
  })

  it('should find a invoice by id', async () => {
    const invoice = await sut.execute({ id: 'any_id' })

    expect(repositoryStub.findById).toHaveBeenCalledWith('any_id')
    expect(invoice).toEqual(mockInvoiceModel())
  })
})
