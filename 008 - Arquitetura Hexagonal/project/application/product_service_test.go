package application_test

import (
	"testing"
	"github.com/stretchr/testify/require"
	"github.com/golang/mock/gomock"
	"go-hexagonal/application"
	mock_application "go-hexagonal/application/mocks"
)

func TestProductService_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	// Será executado no fim da função
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	productPersistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	// "Quero que o método Get quando chamado, independente do parâmetro, retorne o product e nenhum erro todas as vezes
	productPersistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()
	productService := application.ProductService{
		ProductPersistence: productPersistence,
	}

	result, err := productService.Get("abc")

	require.Nil(t, err)
	require.Equal(t, result, product)
}

func TestProductService_Create(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	productPersistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	productPersistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()
	productService := application.ProductService{
		ProductPersistence: productPersistence,
	}

	result, err := productService.Create("p1", 10)

	require.Nil(t, err)
	require.Equal(t, result, product)
}


func TestProductService_EnableDisable(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(nil).AnyTimes()
	product.EXPECT().Disable().Return(nil).AnyTimes()

	productPersistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	productPersistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()
	productService := application.ProductService{
		ProductPersistence: productPersistence,
	}

	result, err := productService.Enable(product)

	require.Nil(t, err)
	require.Equal(t, result, product)

	result, err = productService.Disable(product)

	require.Nil(t, err)
	require.Equal(t, result, product)
}
