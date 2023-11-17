import { Sequelize } from "sequelize-typescript"
import { sequelizeInMemory } from "../../../../../tests/shared/database/sequelize-in-memory";
import InvoiceRepository from "./invoice.repository";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";

describe('ClientRepository', () => {
  let sequelize: Sequelize;
  let sut: InvoiceRepository;

  beforeEach(async () => {
    sequelize = await sequelizeInMemory([InvoiceModel, InvoiceItemModel]);
    sut = new InvoiceRepository();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should save a invoice', async () => {
    const invoice = {
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
        {
          id: 'any_id2',
          name: 'any_name2',
          price: 20,
        },
      ],
      total: 30,
      createdAt: new Date(),
    }

    await sut.save(invoice);

    const invoiceSaved = await InvoiceModel.findByPk(invoice.id, {
      include: [
        {
          model: InvoiceItemModel,
          as: 'items',
        }
      ]
    })

    expect(invoiceSaved).toBeTruthy();
    expect(invoiceSaved.id).toBe(invoice.id);
    expect(invoiceSaved.name).toBe(invoice.name);
    expect(invoiceSaved.document).toBe(invoice.document);
    expect(invoiceSaved.street).toBe(invoice.address.street);
    expect(invoiceSaved.number).toBe(invoice.address.number);
    expect(invoiceSaved.complement).toBe(invoice.address.complement);
    expect(invoiceSaved.city).toBe(invoice.address.city);
    expect(invoiceSaved.state).toBe(invoice.address.state);
    expect(invoiceSaved.zipCode).toBe(invoice.address.zipCode);
    expect(invoiceSaved.total).toBe(invoice.total);
    expect(invoiceSaved.createdAt).toEqual(invoice.createdAt);
    expect(invoiceSaved.items[0].id).toBe(invoice.items[0].id);
    expect(invoiceSaved.items[0].name).toBe(invoice.items[0].name);
    expect(invoiceSaved.items[0].price).toBe(invoice.items[0].price);
    expect(invoiceSaved.items[0].invoiceId).toBe(invoice.id);
    expect(invoiceSaved.items[1].id).toBe(invoice.items[1].id);
    expect(invoiceSaved.items[1].name).toBe(invoice.items[1].name);
    expect(invoiceSaved.items[1].price).toBe(invoice.items[1].price);
    expect(invoiceSaved.items[1].invoiceId).toBe(invoice.id);
  })

  it('should find a invoice by id', async () => {
    const invoice = {
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
        {
          id: 'any_id2',
          name: 'any_name2',
          price: 20,
        },
      ],
      total: 30,
      createdAt: new Date(),
    }

    await sut.save(invoice);

    const output = await sut.findById(invoice.id);

    expect(output).toBeTruthy();
    expect(output.id).toBe(invoice.id);
    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.address.street).toBe(invoice.address.street);
    expect(output.address.number).toBe(invoice.address.number);
    expect(output.address.complement).toBe(invoice.address.complement);
    expect(output.address.city).toBe(invoice.address.city);
    expect(output.address.state).toBe(invoice.address.state);
    expect(output.address.zipCode).toBe(invoice.address.zipCode);
    expect(output.total).toBe(invoice.total);
    expect(output.createdAt).toEqual(invoice.createdAt);
    expect(output.items[0].id).toBe(invoice.items[0].id);
    expect(output.items[0].name).toBe(invoice.items[0].name);
    expect(output.items[0].price).toBe(invoice.items[0].price);
    expect(output.items[1].id).toBe(invoice.items[1].id);
    expect(output.items[1].name).toBe(invoice.items[1].name);
    expect(output.items[1].price).toBe(invoice.items[1].price);
  })
})
