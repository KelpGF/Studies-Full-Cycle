import { Sequelize } from "sequelize-typescript";
import { sequelizeInMemory } from "../../../../tests/shared/database/sequelize-in-memory";
import InvoiceFacade from "./invoice.facade";
import { InvoiceModel } from "../repository/sequelize/invoice.model";
import { InvoiceItemModel } from "../repository/sequelize/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice-facade.factory";

describe('PaymentFacade', () => {
  let sequelize: Sequelize;
  let sut: InvoiceFacade;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([InvoiceModel, InvoiceItemModel]);
    sut = InvoiceFacadeFactory.create();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should generate a invoice', async () => {
    const input = {
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
    }

    const output = await sut.generateInvoice(input);

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

  it('should find a invoice by id', async () => {
    const invoiceSaved = await sut.generateInvoice({
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

    const invoice = await sut.findInvoiceById({ id: invoiceSaved.id })

    expect(invoice.id).toBe(invoiceSaved.id)
    expect(invoice.name).toBe(invoiceSaved.name)
    expect(invoice.document).toBe(invoiceSaved.document)
    expect(invoice.address.street).toBe(invoiceSaved.street)
    expect(invoice.address.number).toBe(invoiceSaved.number)
    expect(invoice.address.complement).toBe(invoiceSaved.complement)
    expect(invoice.address.city).toBe(invoiceSaved.city)
    expect(invoice.address.state).toBe(invoiceSaved.state)
    expect(invoice.address.zipCode).toBe(invoiceSaved.zipCode)
    expect(invoice.items).toEqual(invoiceSaved.items)
    expect(invoice.total).toBe(invoiceSaved.total)
    expect(invoice.createdAt).toBeTruthy()
  })
})
