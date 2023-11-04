import { FindProductByIdGateway, FindProductByIdGatewayInputDto, FindProductByIdGatewayOutputDto } from '../../../../../../src/modules/product-adm/gateway/find-product-by-id';
import { SpyAbstract } from '../../../../../shared/spy/spy-abstract';
import { mockProductPropsWithDates } from '../../../domain/product-props.mock';


export default class FindProductByIdGatewaySpy
  extends SpyAbstract<FindProductByIdGatewayInputDto, FindProductByIdGatewayOutputDto>
  implements FindProductByIdGateway {
  constructor(output?: FindProductByIdGatewayOutputDto, error?: Error) {
    super(output || { product: mockProductPropsWithDates() }, error);
  }

  async findById(input: FindProductByIdGatewayInputDto): Promise<FindProductByIdGatewayOutputDto> {
    return this.call(input);
  }
}
