import { Sequelize } from "sequelize-typescript"
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"





const input: InputCreateProductDto = {
    name: "Test",
    price: 320
}






describe("Integration test for create Product use case",() => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("Should create a product",async () => {
        const prodcutRepository: ProductRepositoryInterface = new ProductRepository()
        const createProductUseCase : CreateProductUseCase= new CreateProductUseCase(prodcutRepository)
        const output : OutputCreateProductDto=  await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
        
    })
})