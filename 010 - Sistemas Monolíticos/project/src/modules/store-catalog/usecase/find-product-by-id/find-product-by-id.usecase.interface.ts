import UseCaseInterface from "../../../shared/usecase/usecase.interface";
import FindProductByIdInputDto from "./find-product-by-id-input.dto";
import FindProductByIdOutputDto from "./find-product-by-id-output.dto";

export default interface FindProductByIdUseCaseInterface extends UseCaseInterface<FindProductByIdInputDto, FindProductByIdOutputDto> {}
