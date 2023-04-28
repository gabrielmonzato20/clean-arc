import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUsesCase {

    private repository: ProductRepositoryInterface

    constructor(repositroy: ProductRepositoryInterface){
        this.repository = repositroy
    }

    async execute(input:InputFindProductDto) : Promise<OutputFindProductDto>{
        let product : ProductInterface = await this.repository.find(input.id);
        return {
            id : product.id,
            name: product.name,
            price: product.price
        }
    }

}