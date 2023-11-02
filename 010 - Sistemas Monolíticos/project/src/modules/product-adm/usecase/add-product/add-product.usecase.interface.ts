import UseCaseInterface from "../../../shared/usecase/usecase.interface";
import AddProductUseCaseInput from "./add-product-usecase-input.dto";
import AddProductUseCaseOutput from "./add-product-usecase-ouput.dto";

export default interface AddProductUseCaseInterface
  extends UseCaseInterface<AddProductUseCaseInput, AddProductUseCaseOutput> {}