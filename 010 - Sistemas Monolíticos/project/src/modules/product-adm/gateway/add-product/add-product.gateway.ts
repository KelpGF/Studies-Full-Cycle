import AddProductGatewayInputDto from "./add-product-gateway-input.dto";

export default interface AddProductGateway {
  add(input: AddProductGatewayInputDto): Promise<void>;
}
