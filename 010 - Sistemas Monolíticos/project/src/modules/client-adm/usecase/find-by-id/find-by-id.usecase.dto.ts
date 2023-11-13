export interface FindByIdInputDto {
  id: string;
}

export interface FindByIdOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
