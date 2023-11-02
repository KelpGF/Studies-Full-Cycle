import FindProductByIdGatewayInput from "./find-product-by-id-gateway-input.dto";
import FindProductByIdGatewayOutput from "./find-product-by-id-gateway-output.dto";

export default interface FindProductByIdGateway {
  findById(input: FindProductByIdGatewayInput): Promise<FindProductByIdGatewayOutput | null>;
}
