import UseCaseInterface from '../../../shared/usecase/usecase.interface';
import { PlaceOrderUseCaseInputDto, PlaceOrderUseCaseOutputDto } from './place-order.usecase.dto';

export default interface PlaceOrderUseCaseInterface
	extends UseCaseInterface<PlaceOrderUseCaseInputDto, PlaceOrderUseCaseOutputDto> {}
