import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Double, Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { User } from "../../users/entities/user.entity";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductsService extends BaseService<Product> {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){
        super();
    }

    getRepository(): Repository<Product> {
        return this.productRepository;
    }

    createProduct(name: string, description: string, category: string, price: Double, user: User): Product {
        let product = new Product()
        product.PRODUCTNAME = name;
        product.DESCRIPTION = description;
        product.CATEGORY = category;
        product.PRICE = price;
        product.USER = user;
        return product;
    }
}