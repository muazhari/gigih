import OneClient from "../clients/OneClient.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";
import Product from "../models/entities/Product.ts";

export default class ProductService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    readAll = (search?: any): Promise<AxiosResponse<Result<Product[]>>> => {
        if (search) {
            return this.oneClient.instance.get(
                `products?search=${encodeURIComponent(JSON.stringify(search))}`
            )
        }
        return this.oneClient.instance.get(
            'products'
        )
    }

    readOneById = (id: string): Promise<AxiosResponse<Result<Product>>> => {
        return this.oneClient.instance.get(
            `products/${id}`
        )
    }

    createOne = (request: Product): Promise<AxiosResponse<Result<Product>>> => {
        return this.oneClient.instance.post(
            'products',
            request
        )
    }

    patchOneById = (id: string, request: Product): Promise<AxiosResponse<Result<Product>>> => {
        return this.oneClient.instance.patch(
            `products/${id}`,
            request
        )
    }

    deleteOneById = (id: string): Promise<AxiosResponse<Result<Product>>> => {
        return this.oneClient.instance.delete(
            `products/${id}`
        )
    }

}
