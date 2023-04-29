

import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUsesCase {

    private repository: ProductRepositoryInterface

    constructor(repositroy: ProductRepositoryInterface){
        this.repository = repositroy
    }

    async execute(input:InputListProductDto) : Promise<OutputListProductDto>{
        let products : ProductInterface[] = await this.repository.findAll();
        return Mapper.convert(products)

    }

}

class Mapper {
    static convert( input : ProductInterface[]): OutputListProductDto{
    return {
        products : input.map((product)=> ({
            id: product.id ,
            name: product.name,
            price:product.price 

        }))
    }
    
    }
}