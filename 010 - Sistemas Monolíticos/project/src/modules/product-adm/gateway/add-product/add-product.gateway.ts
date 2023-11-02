import AddProductGatewayInput from "./add-product-gateway-input.dto";

export default interface AddProductGateway {
  add(input: AddProductGatewayInput): Promise<void>;
}
