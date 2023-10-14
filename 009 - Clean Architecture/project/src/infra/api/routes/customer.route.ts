import { Router } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRouter = Router();

customerRouter.post("/customers", async (req, res) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zipCode: req.body.address.zipCode,
      },
    }

    const output = await useCase.execute(customerDTO);
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRouter.get("/customers", async (req, res) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await useCase.execute({});
    res.status(200).send(output.customers);
  } catch (error) {
    res.status(500).send(error);
  }
})
