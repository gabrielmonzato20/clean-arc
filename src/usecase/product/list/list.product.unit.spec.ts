
import Product from "../../../domain/product/entity/product"
import ProductInterface from "../../../domain/product/entity/product.interface"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { InputListProductDto, OutputListProductDto } from "./list.product.dto"
import ListProductUsesCase from "./list.product.usecase"



const returnProduct: ProductInterface = new Product("1234","Test",200.0)

const input: InputListProductDto = {
}

const listProduct :  ProductInterface[] = [
    ProductFactory.create("a","Test1",200.0),
    ProductFactory.create("b","Test2",400.0),

]

const mockRepository = ()=> {
return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(listProduct)),
    create: jest.fn(),
    update: jest.fn(),
    
}
}

describe("Unit test product list usecase", () => {
    it("should return one product ",async ()=>{
        const productRepository : ProductRepositoryInterface = mockRepository()
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


