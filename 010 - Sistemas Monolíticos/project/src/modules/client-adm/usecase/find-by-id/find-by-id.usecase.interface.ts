import UseCaseInterface from "../../../shared/usecase/usecase.interface";
import { FindByIdInputDto, FindByIdOutputDto } from "./find-by-id.usecase.dto";

export default interface FindClientByIdUseCaseInterface extends UseCaseInterface<FindByIdInputDto, FindByIdOutputDto> {}