import FindAllProductsGatewayOutputDto from "./find-all-products-gateway-output.dto";

export default interface FindAllProductsGateway {
  findAll(): Promise<FindAllProductsGatewayOutputDto>;
}
