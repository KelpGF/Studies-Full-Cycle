import { SpyAbstract } from "../../../../../shared/spy/spy-abstract";
import { FindAllProductsGateway, FindAllProductsGatewayOutputDto } from "../../../../../../src/modules/store-catalog/gateway/find-all-products"

export default class FindAllProductsRepositorySpy
  extends SpyAbstract<undefined, FindAllProductsGatewayOutputDto>
  implements FindAllProductsGateway {

  constructor(output?: FindAllProductsGatewayOutputDto, error?: Error) {
    super(output || { products: [] }, error);
  }

  async findAll(): Promise<FindAllProductsGatewayOutputDto> {
    return this.call(undefined);
  }
}