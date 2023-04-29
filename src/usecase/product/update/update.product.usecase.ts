import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";




export default class UpdateProductUsesCase {

    private repository: ProductRepositoryInterface

    constructor(repositroy: ProductRepositoryInterface){
        this.repository = repositroy
    }

    async execute(input:InputUpdateProductDto) : Promise<OutputUpdateProductDto>{
        let product: ProductInterface  = await this.repository.find(input.id);
        let productchange   = new Product(product.id,product.name,product.price)
        productchange.changeName(input.name)
        productchange.changePrice(input.price)
        product = productchange
        await this.repository.update(product);
        
       return {
        id: product.id,
        name:product.name,
        price:product.price
       }

    }

}

