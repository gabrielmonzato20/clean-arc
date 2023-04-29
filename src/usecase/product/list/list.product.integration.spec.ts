import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductInterface from "../../../domain/product/entity/product.interface"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputListProductDto, OutputListProductDto } from "./list.product.dto"
import ListProductUsesCase from "./list.product.usecase"




const returnProduct: ProductInterface = new Product("1234","Test",200.0)

const input: InputListProductDto = {
}

const listProduct :  ProductInterface[] = [
    ProductFactory.create("a","Test1",200.0),
    ProductFactory.create("b","Test2",400.0),

]


describe("Integration test product list usecase", () => {
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
    it("should return one product ",async ()=>{
        const productRepository : ProductRepositoryInterface = new ProductRepository()
        await productRepository.create(listProduct[0]);
        await productRepository.create(listProduct[1]);

        const findProductUseCase : ListProductUsesCase = new ListProductUsesCase(productRepository);
        const result:OutputListProductDto = await findProductUseCase.execute(input);
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(listProduct[0].id);
        expect(result.products[0].name).toBe(listProduct[0].name);
        expect(result.products[0].price).toBe(listProduct[0].price);
        expect(result.products[1].id).toBe(listProduct[1].id);
        expect(result.products[1].name).toBe(listProduct[1].name);
        expect(result.products[1].price).toBe(listProduct[1].price);
    })
})


