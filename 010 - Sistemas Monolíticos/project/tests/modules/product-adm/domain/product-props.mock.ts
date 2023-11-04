
export const mockProductProps = () => ({
  id: '1',
  name: 'Product 1',
  description: 'Description 1',
  purchasePrice: 10,
  stock: 10,
})

export const mockProductPropsWithDates = () => ({
  id: '1',
  name: 'Product 1',
  description: 'Description 1',
  purchasePrice: 10,
  stock: 10,
  createdAt: new Date('2021-01-01T00:00:00.000Z'),
  updatedAt: new Date('2021-01-01T00:01:00.000Z'),
})
