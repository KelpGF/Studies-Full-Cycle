import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/sequelize/invoice.repository";
import FindInvoiceByIdUseCase from "../usecase/find-invoice-by-id/find-invoice-by-id.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    const findInvoiceByIdUseCase = new FindInvoiceByIdUseCase(invoiceRepository);
    const invoiceFacadeProps = {
      generateInvoiceUseCase,
      findInvoiceByIdUseCase,
    }
    return new InvoiceFacade(invoiceFacadeProps);
  }
}
