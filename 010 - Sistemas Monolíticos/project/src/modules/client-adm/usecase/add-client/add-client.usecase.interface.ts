import UseCaseInterface from "../../../shared/usecase/usecase.interface";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default interface AddClientUseCaseInterface extends UseCaseInterface<AddClientInputDto, AddClientOutputDto> {}