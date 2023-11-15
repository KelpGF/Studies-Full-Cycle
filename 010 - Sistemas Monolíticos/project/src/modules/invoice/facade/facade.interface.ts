export interface FindInvoiceByIdFacadeInputDTO {
	id: string;
}

export interface FindInvoiceByIdFacadeOutputDTO {
	id: string;
	name: string;
	document: string;
	address: {
		street: string;
		number: string;
		complement: string;
		city: string;
		state: string;
		zipCode: string;
	};
	items: {
		id: string;
		name: string;
		price: number;
	}[];
	total: number;
	createdAt: Date;
}

export interface GenerateInvoiceFacadeInputDto {
	name: string;
	document: string;
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;
	items: {
		id: string;
		name: string;
		price: number;
	}[];
}

export interface GenerateInvoiceFacadeOutputDto {
	id: string;
	name: string;
	document: string;
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;
	items: {
		id: string;
		name: string;
		price: number;
	}[];
	total: number;
}

export default interface InvoiceFacadeInterface {
	findInvoiceById: (input: FindInvoiceByIdFacadeInputDTO) => Promise<FindInvoiceByIdFacadeOutputDTO>;
	generateInvoice: (input: GenerateInvoiceFacadeInputDto) => Promise<GenerateInvoiceFacadeOutputDto>;
}
