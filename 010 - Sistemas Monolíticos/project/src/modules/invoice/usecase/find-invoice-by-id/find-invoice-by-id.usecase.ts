import InvoiceGatewayInterface from '../../gateway/invoice.gateway';
import { FindInvoiceByIdUseCaseInputDTO, FindInvoiceByIdUseCaseOutputDTO } from './find-invoice-by-id.usecase.dto';
import FindInvoiceByIdUseCaseInterface from './find-invoice-by-id.usecase.interface';

export default class FindInvoiceByIdUseCase implements FindInvoiceByIdUseCaseInterface {
	constructor(private readonly invoiceGateway: InvoiceGatewayInterface) {}

  async execute(input: FindInvoiceByIdUseCaseInputDTO): Promise<FindInvoiceByIdUseCaseOutputDTO> {
    const invoice = await this.invoiceGateway.findById(input.id);

    return invoice;
  }
}
