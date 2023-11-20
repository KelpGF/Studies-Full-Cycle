import IdVo from '../../../shared/domain/value-object/id.vo';
import ProductEntity from '../../domain/product.entity';
import PlaceOrderUseCase from './place-order.usecase';

describe('PlaceOrderUseCase unit test', () => {
	const makeSut = () => {
		const mockClientAdmFacadeStub = {
			findById: jest.fn(({ id }) =>
				Promise.resolve({
					id: id,
					name: 'any_client_name',
					email: 'any_client_email',
					document: 'any_client_document',
					city: 'any_city',
					state: 'any_state',
					zipCode: 'any_zipCode',
					street: 'any_street',
					number: 'any_number',
					complement: 'any_complement',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
				}),
			),
			add: jest.fn(),
		};
		const mockProductAdmFacadeStub = {
			checkStock: jest.fn(({ productId }) =>
				Promise.resolve({
					productId: productId,
					stock: 2,
				}),
			),
			addProduct: jest.fn(),
		};
		const mockStoreCatalogFacadeStub = {
			findProductById: jest.fn(({ productId }) =>
				Promise.resolve({
					product: {
						id: productId,
						name: 'any_product_name',
						description: 'any_product_description',
						salesPrice: 10,
					},
				}),
			),
			findAllProducts: jest.fn(),
		};
		const mockProcessPaymentFacadeStub = {
			processPayment: jest.fn(async () => ({
				transactionId: 'any_transaction_id',
				orderId: 'any_order_id',
				amount: 100,
				status: 'approved',
				createdAt: new Date(),
				updatedAt: new Date(),
			})),
		};
		const mockInvoiceFacadeInterface = {
			generateInvoice: jest.fn().mockResolvedValue({
				id: 'any_invoice_id',
				name: 'any_client_name',
				document: 'any_client_document',
				street: 'any_street',
				number: 'any_number',
				complement: 'any_complement',
				city: 'any_city',
				state: 'any_state',
				zipCode: 'any_zipCode',
				items: [{ id: 'any_product_id', name: 'any_product_name', price: 10 }],
			}),
			findInvoiceById: jest.fn(),
		};

		const mockCheckoutRepository = {
			addOrder: jest.fn(),
			findOrderById: jest.fn(),
		};

		const sut = new PlaceOrderUseCase(
			mockClientAdmFacadeStub,
			mockProductAdmFacadeStub,
			mockStoreCatalogFacadeStub,
			mockProcessPaymentFacadeStub,
			mockInvoiceFacadeInterface,
			mockCheckoutRepository,
		);

		return {
			sut,
			mockClientAdmFacadeStub,
			mockProductAdmFacadeStub,
			mockStoreCatalogFacadeStub,
			mockProcessPaymentFacadeStub,
			mockInvoiceFacadeInterface,
			mockCheckoutRepository,
		};
	};

	const makeInput = () => ({
		clientId: 'any_client_id',
		products: [{ id: 'any_product_id' }],
	});

	describe('execute', () => {
		const mockDate = new Date('2023-11-18T15:33:46.739Z');

		beforeAll(() => {
			jest.useFakeTimers('modern');
			jest.setSystemTime(mockDate);
		});

		afterAll(() => {
			jest.useRealTimers();
		});

		it('should throw error if client not found', async () => {
			const { sut, mockClientAdmFacadeStub } = makeSut();
			mockClientAdmFacadeStub.findById.mockResolvedValueOnce(null);
			const input = makeInput();

			const promise = sut.execute(input);

			await expect(promise).rejects.toThrowError('Client not found');
			expect(mockClientAdmFacadeStub.findById).toHaveBeenCalledTimes(1);
			expect(mockClientAdmFacadeStub.findById).toHaveBeenCalledWith({ id: input.clientId });
		});

		it('should throw a error when products are not valid', async () => {
			const { sut } = makeSut();
			const input = makeInput();
			const validateProductsSpy = jest.spyOn(sut, 'validateProducts');
			validateProductsSpy.mockImplementationOnce(() => {
				throw new Error('Products are not valid');
			});

			const promise = sut.execute(input);

			await expect(promise).rejects.toThrowError('Products are not valid');
			expect(validateProductsSpy).toHaveBeenCalledTimes(1);
			expect(validateProductsSpy).toHaveBeenCalledWith(input.products);
		});

		it('should throw if getProduct throws', async () => {
			const { sut } = makeSut();
			const input = makeInput();
			const getProductSpy = jest.spyOn(sut, 'getProduct');
			getProductSpy.mockRejectedValueOnce(new Error('Product any_product_id not found'));

			const promise = sut.execute(input);

			await expect(promise).rejects.toThrowError('Product any_product_id not found');
			expect(getProductSpy).toHaveBeenCalledTimes(1);
			expect(getProductSpy).toHaveBeenCalledWith('any_product_id');
		});

		describe('Place order', () => {
			it('should not be approved', async () => {
				const { sut, mockCheckoutRepository, mockInvoiceFacadeInterface, mockProcessPaymentFacadeStub } = makeSut();
				const input = makeInput();
				input.products.push({ id: 'any_product_id2' });
				mockProcessPaymentFacadeStub.processPayment.mockResolvedValueOnce({
					transactionId: 'any_transaction_id',
					orderId: 'any_order_id',
					amount: 20,
					status: 'declined',
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				const output = await sut.execute(input);

				expect(output.invoiceId).toBeNull();
				expect(output.total).toBe(20);
				expect(output.products).toStrictEqual([{ id: 'any_product_id' }, { id: 'any_product_id2' }]);
				expect(mockProcessPaymentFacadeStub.processPayment).toHaveBeenCalledTimes(1);
				expect(mockProcessPaymentFacadeStub.processPayment).toHaveBeenCalledWith({
					orderId: expect.any(String),
					amount: 20,
				});
				expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
				expect(mockInvoiceFacadeInterface.generateInvoice).toHaveBeenCalledTimes(0);
			});

			it('should be approved', async () => {
				const { sut } = makeSut();
				const input = makeInput();

				const output = await sut.execute(input);

				expect(output.invoiceId).toBe('any_invoice_id');
				expect(output.total).toBe(10);
				expect(output.products).toStrictEqual([{ id: 'any_product_id' }]);
				expect(output.status).toBe('approved');
				expect(output.id).toBeDefined();
			});
		});
	});

	describe('validateProducts', () => {
		it('should throw a error when no products selected', async () => {
			const { sut } = makeSut();
			let { products } = makeInput();
			products = [];

			const promise = sut.validateProducts(products);

			await expect(promise).rejects.toThrowError('No products selected');
		});

		it('should throw a error if checkProductStock throws', async () => {
			const { products } = makeInput();
			const { sut } = makeSut();
			const checkStockSpy = jest.spyOn(sut, 'checkProductStock');
			checkStockSpy.mockRejectedValue(new Error('Product any_product_id2 is not available in stock'));

			const promise = sut.validateProducts(products);

			await expect(promise).rejects.toThrowError('Product any_product_id2 is not available in stock');
		});

		it('should check stock of all products', async () => {
			const { products } = makeInput();
			products.push({ id: 'any_product_id2' });
			products.push({ id: 'any_product_id3' });

			const { sut } = makeSut();
			const checkStockSpy = jest.spyOn(sut, 'checkProductStock');

			await sut.validateProducts(products);

			expect(checkStockSpy).toHaveBeenCalledTimes(3);
			expect(checkStockSpy).toHaveBeenNthCalledWith(1, 'any_product_id');
			expect(checkStockSpy).toHaveBeenNthCalledWith(2, 'any_product_id2');
			expect(checkStockSpy).toHaveBeenNthCalledWith(3, 'any_product_id3');
		});
	});

	describe('checkProductStock', () => {
		it('should check product stock', async () => {
			const { sut, mockProductAdmFacadeStub } = makeSut();
			const checkStockSpy = jest.spyOn(mockProductAdmFacadeStub, 'checkStock');

			await sut.checkProductStock('any_product_id');

			expect(checkStockSpy).toHaveBeenCalledTimes(1);
			expect(checkStockSpy).toHaveBeenCalledWith({ productId: 'any_product_id' });
		});

		it('should throw a error when product is not available in stock', async () => {
			const { sut, mockProductAdmFacadeStub } = makeSut();
			const checkStockSpy = jest.spyOn(mockProductAdmFacadeStub, 'checkStock');
			checkStockSpy.mockResolvedValueOnce({
				productId: 'any_product_id',
				stock: 0,
			});
			const { products } = makeInput();

			const promise = sut.validateProducts(products);

			await expect(promise).rejects.toThrowError('Product any_product_id is not available in stock');
			expect(checkStockSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('getProduct', () => {
		const mockDate = new Date('2023-11-18T15:33:46.739Z');

		beforeAll(() => {
			jest.useFakeTimers('modern');
			jest.setSystemTime(mockDate);
		});

		afterAll(() => {
			jest.useRealTimers();
		});

		it('should return throw if product not found', async () => {
			const { sut, mockStoreCatalogFacadeStub } = makeSut();
			const findProductByIdSpy = jest.spyOn(mockStoreCatalogFacadeStub, 'findProductById');
			findProductByIdSpy.mockResolvedValueOnce(null);

			const promise = sut.getProduct('any_product_id');

			await expect(promise).rejects.toThrowError('Product any_product_id not found');
			expect(findProductByIdSpy).toHaveBeenCalledTimes(1);
			expect(findProductByIdSpy).toHaveBeenCalledWith({ productId: 'any_product_id' });
		});

		it('should return product', async () => {
			const { sut, mockStoreCatalogFacadeStub } = makeSut();
			const findProductByIdSpy = jest.spyOn(mockStoreCatalogFacadeStub, 'findProductById');

			const output = await sut.getProduct('any_product_id');

			expect(findProductByIdSpy).toHaveBeenCalledTimes(1);
			expect(findProductByIdSpy).toHaveBeenCalledWith({ productId: 'any_product_id' });
			expect(output).toEqual(
				new ProductEntity({
					id: new IdVo('any_product_id'),
					name: 'any_product_name',
					description: 'any_product_description',
					salesPrice: 10,
				}),
			);
		});
	});
});
