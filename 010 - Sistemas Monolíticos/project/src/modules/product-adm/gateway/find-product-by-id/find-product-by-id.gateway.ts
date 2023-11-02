import FindProductByIdGatewayInputDto from "./find-product-by-id-gateway-input.dto";
import FindProductByIdGatewayOutputDto from "./find-product-by-id-gateway-output.dto";

export default interface FindProductByIdGateway {
  findById(input: FindProductByIdGatewayInputDto): Promise<FindProductByIdGatewayOutputDto | null>;
}
