import { Router } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequilize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
export const productRouter = Router();

productRouter.post("/product", async (req, res) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDTO = {
      name: req.body.name,
      price: req.body.price
    }

    const output = await useCase.execute(productDTO);
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.get("/product", async (req, res) => {
  const useCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await useCase.execute({});
    res.status(200).send(output.products);
  } catch (error) {
    res.status(500).send(error);
  }
})
