import { ClientAdmFacadeInterface } from '../../../client-adm/facade/client-adm.facade.interface';
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface';
import IdVo from '../../../shared/domain/value-object/id.vo';
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface';
import ProductEntity from '../../domain/product.entity';
import { PlaceOrderUseCaseInputDto, PlaceOrderUseCaseOutputDto } from './place-order.usecase.dto';
import PlaceOrderUseCaseInterface from './place-order.usecase.interface';

export default class PlaceOrderUseCase implements PlaceOrderUseCaseInterface {
	constructor(
		private readonly clientAdmFacade: ClientAdmFacadeInterface,
		private readonly productAdmFacade: ProductAdmFacadeInterface,
    private readonly storeCatalogFacade: StoreCatalogFacadeInterface,
	) {}

	async execute(input: PlaceOrderUseCaseInputDto): Promise<PlaceOrderUseCaseOutputDto> {
		const client = await this.clientAdmFacade.findById({ id: input.clientId });
		if (!client) throw new Error('Client not found');

		await this.validateProducts(input.products);

		return {
			id: '',
			invoiceId: '',
			status: '',
			total: 0,
			products: [],
		};
	}

	async validateProducts(products: { id: string }[]) {
		if (!products.length) throw new Error('No products selected');

		for (const product of products) {
      await this.checkProductStock(product.id);
		}
	}

  async checkProductStock(productId: string) {
    const { stock } = await this.productAdmFacade.checkStock({ productId: productId });
    if (stock <= 0) throw new Error(`Product ${productId} is not available in stock`);
  }

  async getProduct(productId: string): Promise<ProductEntity> {
    const result = await this.storeCatalogFacade.findProductById({ productId: productId });
    if (!result) throw new Error(`Product ${productId} not found`);

    const productProps = {
      id: new IdVo(result.product.id),
      name: result.product.name,
      description: result.product.description,
      salesPrice: result.product.salesPrice,
    }

    return new ProductEntity(productProps);
  }
}
