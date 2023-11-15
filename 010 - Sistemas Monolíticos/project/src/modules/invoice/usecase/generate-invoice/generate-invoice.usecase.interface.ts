import UseCaseInterface from '../../../shared/usecase/usecase.interface';
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoice.usecase.dto';

export default interface GenerateInvoiceUseCaseInterface
	extends UseCaseInterface<GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto> {}
