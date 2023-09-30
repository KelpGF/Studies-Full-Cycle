package application

type ProductService struct {
	ProductPersistence ProductPersistenceInterface
}

func (s *ProductService) Get(id string) (ProductInterface, error) {
	product, err := s.ProductPersistence.Get(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *ProductService) Create(name string, price float64) (ProductInterface, error) {
	product := NewProduct()
	product.Name = name
	product.Price = price

	_, err := product.IsValid()

	if err != nil {
		return &Product{}, err
	}

	result, err := s.ProductPersistence.Save(product)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}
