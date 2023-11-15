import InvoiceItemEntity from "../../domain/entity/invoice-item.entity";
import InvoiceEntity from "../../domain/entity/invoice.entity";
import InvoiceAddressVo from "../../domain/value-object/invoice-address.vo";
import InvoiceGatewayInterface, { InvoiceModel } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";
import GenerateInvoiceUseCaseInterface from "./generate-invoice.usecase.interface";

export default class GenerateInvoiceUseCase implements GenerateInvoiceUseCaseInterface {
  constructor(private readonly invoiceGateway: InvoiceGatewayInterface) {}
  
  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoiceItems = input.items.map(item => new InvoiceItemEntity({
      name: item.name,
      price: item.price,
    }))
    const invoiceAddress = new InvoiceAddressVo({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    })
    const invoice = new InvoiceEntity({
      name: input.name,
      document: input.document,
      address: invoiceAddress,
      items: invoiceItems,
    })

    const saveInvoiceInput: InvoiceModel = {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
    }

    await this.invoiceGateway.save(saveInvoiceInput)

    return {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
    }
  }
}
