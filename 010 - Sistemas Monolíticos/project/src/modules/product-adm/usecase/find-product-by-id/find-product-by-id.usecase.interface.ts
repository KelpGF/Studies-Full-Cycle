import UseCaseInterface from "../../../shared/usecase/usecase.interface";
import FindProductByIInputDto from "./find-product-by-id-input.dto";
import FindProductByIOutputDto from "./find-product-by-id-output.dto";

export default interface FindProductByIUseCaseInterface extends UseCaseInterface<FindProductByIInputDto, FindProductByIOutputDto> {}
