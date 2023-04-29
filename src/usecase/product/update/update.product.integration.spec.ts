import { Sequelize } from "sequelize-typescript";
import ProductInterface from "../../../domain/product/entity/product.interface"
import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUsesCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";


const product: ProductInterface = ProductFactory.create("a","Test",200.0);
const input : InputUpdateProductDto = {
    id : product.id,
    name:"Test updated",
    price: 600.0
}



describe("Integration test update product usecase", ()=>{
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels( [ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
    it("should update product",async () => {
        const productRepository:ProductRepositoryInterface = new ProductRepository();
        await productRepository.create(product);
        const findProductUseCase = new UpdateProductUsesCase(productRepository);
        const output = await findProductUseCase.execute(input);
        expect(output).toEqual(input);
    })
})