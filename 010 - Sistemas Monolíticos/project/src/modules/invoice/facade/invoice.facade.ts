import FindInvoiceByIdUseCaseInterface from '../usecase/find-invoice-by-id/find-invoice-by-id.usecase.interface';
import GenerateInvoiceUseCaseInterface from '../usecase/generate-invoice/generate-invoice.usecase.interface';
import InvoiceFacadeInterface, {
	FindInvoiceByIdFacadeInputDTO,
	FindInvoiceByIdFacadeOutputDTO,
	GenerateInvoiceFacadeInputDto,
	GenerateInvoiceFacadeOutputDto,
} from './facade.interface';

type InvoiceFacadeInterfaceProps = {
	findInvoiceByIdUseCase: FindInvoiceByIdUseCaseInterface;
	generateInvoiceUseCase: GenerateInvoiceUseCaseInterface;
};

export default class InvoiceFacade implements InvoiceFacadeInterface {
	private findInvoiceByIdUseCase: FindInvoiceByIdUseCaseInterface;
	private generateInvoiceUseCase: GenerateInvoiceUseCaseInterface;

	constructor(props: InvoiceFacadeInterfaceProps) {
		this.findInvoiceByIdUseCase = props.findInvoiceByIdUseCase;
		this.generateInvoiceUseCase = props.generateInvoiceUseCase;
	}

	async findInvoiceById(input: FindInvoiceByIdFacadeInputDTO): Promise<FindInvoiceByIdFacadeOutputDTO> {
    const invoice = await this.findInvoiceByIdUseCase.execute(input);
    return invoice;
  }

	async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    const invoice = await this.generateInvoiceUseCase.execute(input);
    return invoice;
  }
}
