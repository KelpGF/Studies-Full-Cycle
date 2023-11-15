import InvoiceGatewayInterface, { InvoiceModel } from "../../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel as InvoiceModelSequelize } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGatewayInterface {
  async save(invoice: InvoiceModel): Promise<void> {
    await InvoiceModelSequelize.create({
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      total: invoice.total,
      createdAt: invoice.createdAt,
      items: invoice.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
    }, {
      include: [
        {
          model: InvoiceItemModel,
          as: 'items',
        }
      ]
    })
  }
  
  async findById(id: string): Promise<InvoiceModel> {
    const invoice = await InvoiceModelSequelize.findByPk(id, {
      include: [
        {
          model: InvoiceItemModel,
          as: 'items',
        }
      ]
    })

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      },
      items: invoice.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
    }
  }
}