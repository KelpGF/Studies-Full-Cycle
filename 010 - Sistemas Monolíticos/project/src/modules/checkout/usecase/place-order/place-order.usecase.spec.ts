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
					address: 'any_client_address',
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
		const sut = new PlaceOrderUseCase(mockClientAdmFacadeStub, mockProductAdmFacadeStub, mockStoreCatalogFacadeStub);

		return { sut, mockClientAdmFacadeStub, mockProductAdmFacadeStub, mockStoreCatalogFacadeStub };
	};

	const makeInput = () => ({
		clientId: 'any_client_id',
		products: [{ id: 'any_product_id' }],
	});

	describe('execute', () => {
		it('should throw error if client not found', async () => {
			const { sut, mockClientAdmFacadeStub } = makeSut();
			mockClientAdmFacadeStub.findById.mockResolvedValueOnce(null);
			const input = makeInput();

			const promise = sut.execute(input);

			await expect(promise).rejects.toThrowError('Client not found');
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
			expect(output).toEqual(new ProductEntity({
        id: new IdVo('any_product_id'),
        name: 'any_product_name',
        description: 'any_product_description',
        salesPrice: 10,
      }));
		});
	});
});
