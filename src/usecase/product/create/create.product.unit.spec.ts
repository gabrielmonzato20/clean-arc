import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const input: InputCreateProductDto = {
    name: "Test",
    price: 320
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for create Product use case",() => {

    it("Should create a product",async () => {
        const prodcutRepository: ProductRepositoryInterface =  MockRepository()
        const createProductUseCase : CreateProductUseCase= new CreateProductUseCase(prodcutRepository)
        const output : OutputCreateProductDto=  await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
        
    })
})