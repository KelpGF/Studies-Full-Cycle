import UseCaseInterface from '../../../shared/usecase/usecase.interface';
import { FindInvoiceByIdUseCaseInputDTO, FindInvoiceByIdUseCaseOutputDTO } from './find-invoice-by-id.usecase.dto';

export default interface FindInvoiceByIdUseCaseInterface
	extends UseCaseInterface<FindInvoiceByIdUseCaseInputDTO, FindInvoiceByIdUseCaseOutputDTO> {}
