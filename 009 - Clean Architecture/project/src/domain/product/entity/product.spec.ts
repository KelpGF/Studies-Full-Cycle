import Product from "./product";

describe("Product Entity", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Product("", "Product Name", 10)).toThrow("product: Id is required");
  })

  it("should throw an error when name is empty", () => {
    expect(() => new Product("123", "", 10)).toThrow("product: Name is required");
  })

  it("should throw an error when price is less than zero", () => {
    expect(() => new Product("123", "P1", -1)).toThrow("product: Price must be positive");
  })

  it ("should throw error when id, name and price is invalid", () => {
    expect(() => new Product("", "", -1)).toThrowError("product: Id is required, product: Name is required, product: Price must be positive")
  })

  it ("should change name", () => {
    const product = new Product("123", "Product Name", 10);
    product.changeName("New Product Name");
    expect(product.name).toBe("New Product Name");
  })

  it ("should throw when change name to a empty name", () => {
    expect(() => new Product("123", "Product Name", 10).changeName("")).toThrow("product: Name is required");
  })

  it ("should change price", () => {
    const product = new Product("123", "Product Name", 10);
    product.changePrice(15);
    expect(product.price).toBe(15);
  })

  it ("should throw when change price to a invalid name", () => {
    expect(() => new Product("123", "Product Name", 10).changePrice(-1)).toThrow("product: Price must be positive");
  })
});
