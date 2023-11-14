import UseCaseInterface from "../../../shared/usecase/usecase.interface";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default interface ProcessPaymentUseCaseInterface extends UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto> {}
