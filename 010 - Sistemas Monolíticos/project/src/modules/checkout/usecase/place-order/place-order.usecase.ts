import { ClientAdmFacadeInterface } from '../../../client-adm/facade/client-adm.facade.interface';
import InvoiceFacadeInterface from '../../../invoice/facade/facade.interface';
import ProcessPaymentFacadeInterface from '../../../payment/facade/facade.interface';
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface';
import IdVo from '../../../shared/domain/value-object/id.vo';
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface';
import ClientEntity from '../../domain/client.entity';
import OrderEntity from '../../domain/order.entity';
import ProductEntity from '../../domain/product.entity';
import CheckoutGatewayInterface from '../../gateway/checkout.gateway';
import { PlaceOrderUseCaseInputDto, PlaceOrderUseCaseOutputDto } from './place-order.usecase.dto';
import PlaceOrderUseCaseInterface from './place-order.usecase.interface';

export default class PlaceOrderUseCase implements PlaceOrderUseCaseInterface {
	constructor(
		private readonly clientAdmFacade: ClientAdmFacadeInterface,
		private readonly productAdmFacade: ProductAdmFacadeInterface,
		private readonly storeCatalogFacade: StoreCatalogFacadeInterface,
		private readonly processPaymentFacade: ProcessPaymentFacadeInterface,
		private readonly invoiceFacadeInterface: InvoiceFacadeInterface,
		private readonly checkoutRepository: CheckoutGatewayInterface,
	) {}

	async execute(input: PlaceOrderUseCaseInputDto): Promise<PlaceOrderUseCaseOutputDto> {
		const client = await this.clientAdmFacade.findById({ id: input.clientId });
		if (!client) throw new Error('Client not found');

		await this.validateProducts(input.products);

		const productEntities = await Promise.all(input.products.map(({ id }) => this.getProduct(id)));
		const clientEntity = new ClientEntity({
			id: new IdVo(client.id),
			name: client.name,
			email: client.email,
			document: client.document,
			street: client.street,
			number: client.number,
			complement: client.complement,
			city: client.city,
			state: client.state,
			zipCode: client.zipCode,
		});
		const orderEntity = new OrderEntity({
			client: clientEntity,
			products: productEntities,
		});

		const payment = await this.processPaymentFacade.processPayment({
			orderId: orderEntity.id.value,
			amount: orderEntity.total,
		});

		const invoice =
			payment.status === 'approved'
				? await this.invoiceFacadeInterface.generateInvoice({
						name: client.name,
						document: client.document,
						street: client.street,
						number: client.number,
						complement: client.complement,
						city: client.city,
						state: client.state,
						zipCode: client.zipCode,
						items: orderEntity.products.map((product) => ({
							id: product.id.value,
							name: product.name,
							price: product.salesPrice,
						})),
				  })
				: null;
    if (payment.status === 'approved') orderEntity.approve()
    await this.checkoutRepository.addOrder(orderEntity)

		return {
			id: orderEntity.id.value,
			invoiceId: payment.status === 'approved' ? invoice.id : null,
			status: payment.status,
			total: orderEntity.total,
			products: orderEntity.products.map((product) => ({
				id: product.id.value,
			})),
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
		};

		return new ProductEntity(productProps);
	}
}
