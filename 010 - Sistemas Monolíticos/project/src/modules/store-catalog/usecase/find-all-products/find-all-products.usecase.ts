import { FindAllProductsGateway, FindAllProductsGatewayOutputDto } from "../../gateway/find-all-products";
import FindAllProductsUseCaseInterface from "./find-all-products.usecase.interface";

export default class  FindAllProductsUseCase implements FindAllProductsUseCaseInterface {
  constructor(
    private readonly findAllProductsGateway: FindAllProductsGateway
  ) {}

  async execute(): Promise<FindAllProductsGatewayOutputDto> {
    return this.findAllProductsGateway.findAll();
  }
}
