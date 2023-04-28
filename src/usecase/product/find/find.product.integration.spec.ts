import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUsesCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";


const returnProduct: ProductInterface = new Product("1234","Test",200.0)

const input: InputFindProductDto = {
    id: "1234"
}

const inputNotFound: InputFindProductDto = {
    id: "12345"
}
const output : OutputFindProductDto = {
    id : "1234",
    name: "Test",
    price : 200.0
}



describe("Unit test product find usecase", () => {
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
    it("should return one product ",async ()=>{
        const productRepository : ProductRepositoryInterface = new ProductRepository()

        const product: ProductInterface = new Product(output.id,output.name,output.price);
        await productRepository.create(product);
        
        const findProductUseCase : FindProductUsesCase = new FindProductUsesCase(productRepository);
        const result:ProductInterface = await findProductUseCase.execute(input);
        expect(result).toEqual(output)
    })

    it("should not return one product ",async ()=>{
        const productRepository: ProductRepositoryInterface  = new ProductRepository()
       
        const findProductUseCase : FindProductUsesCase = new FindProductUsesCase(productRepository);
        expect(async() => {
             return await findProductUseCase.execute(inputNotFound)
        }).rejects.toThrow("Product not found");

        
    })
})

