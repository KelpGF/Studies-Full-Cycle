import ProcessPaymentUseCaseInterface from "../usecase/process-payment/process-payment.usecase.interface";
import ProcessPaymentFacadeInterface, { ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto } from "./facade.interface";

export default class ProcessPaymentFacade implements ProcessPaymentFacadeInterface {
  constructor(private readonly processPaymentUseCase: ProcessPaymentUseCaseInterface) {}

  async processPayment(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input);
  }
}