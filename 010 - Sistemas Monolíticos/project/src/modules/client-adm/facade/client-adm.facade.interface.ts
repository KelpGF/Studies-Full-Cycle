export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
	document: string;
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface AddClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
	document: string;
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindByIdFacadeInputDto {
  id: string;
}

export interface FindByIdFacadeOutputDto {
  id: string;
  name: string;
  email: string;
	document: string;
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
  add: (client: AddClientFacadeInputDto) => Promise<AddClientFacadeOutputDto>;
  findById: (client: FindByIdFacadeInputDto) => Promise<FindByIdFacadeOutputDto>;
}
