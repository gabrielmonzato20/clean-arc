import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUsesCase from "./find.product.usecase";


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

const mockRepository = ()=> {
return {
    find: jest.fn().mockReturnValue(Promise.resolve(returnProduct)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    
}
}

describe("Unit test product find usecase", () => {
    it("should return one product ",async ()=>{
        const productRepository : ProductRepositoryInterface = mockRepository()
        const findProductUseCase : FindProductUsesCase = new FindProductUsesCase(productRepository);
        const result:OutputFindProductDto = await findProductUseCase.execute(input);
        expect(result).toEqual(output)
    })

    it("should not return one product ",async ()=>{
        const productRepository  = mockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
          });
        const findProductUseCase : FindProductUsesCase = new FindProductUsesCase(productRepository);
        expect(() => {
             return findProductUseCase.execute(inputNotFound)
        }).rejects.toThrow("Product not found");

        
    })
})

