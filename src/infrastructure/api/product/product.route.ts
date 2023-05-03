import express ,{ Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import ListProductUsesCase from "../../../usecase/product/list/list.product.usecase";
import { OutputListProductDto } from "../../../usecase/product/list/list.product.dto";
import ProductPresenter from "./product.presenter";

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
    const usecase: CreateProductUseCase = new CreateProductUseCase(new ProductRepository());
    try {
      const productDto:InputCreateProductDto = {
        name: req.body.name,
        price: req.body.price
      };
      const output:OutputCreateProductDto = await usecase.execute(productDto);

      res.send(output);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  productRouter.get("/", async (req: Request, res: Response) => {
    const usecase :ListProductUsesCase = new ListProductUsesCase(new ProductRepository());
    const output: OutputListProductDto = await usecase.execute({});
  
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.listXML(output)),
    });
  });
  