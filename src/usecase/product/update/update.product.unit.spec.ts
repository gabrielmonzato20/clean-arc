import ProductInterface from "../../../domain/product/entity/product.interface"
import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUsesCase from "./update.product.usecase";


const product: ProductInterface = ProductFactory.create("a","Test",200.0);
const input : InputUpdateProductDto = {
    id : product.id,
    name:"Test updated",
    price: 600.0
}

const mockRepository = ()=> {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        
    }
    }

describe("Unit test update product usecase", ()=>{

    it("should update product",async () => {
        const productRepository = mockRepository();
        const findProductUseCase = new UpdateProductUsesCase(productRepository);

    const output = await findProductUseCase.execute(input);

    expect(output).toEqual(input);
    })
})