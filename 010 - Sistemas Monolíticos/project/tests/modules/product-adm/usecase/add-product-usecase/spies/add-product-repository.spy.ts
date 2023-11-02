import { AddProductGateway, AddProductGatewayInputDto } from '../../../../../../src/modules/product-adm/gateway/add-product';
import { SpyAbstract } from '../../../../../shared/spy/spy-abstract';


export default class AddProductGatewaySpy
  extends SpyAbstract<AddProductGatewayInputDto, void>
  implements AddProductGateway {
  constructor(output: void, error?: Error) {
    super(output, error);
  }

  async add(input: AddProductGatewayInputDto): Promise<void> {
    return this.call(input);
  }
}
