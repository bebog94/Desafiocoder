import { productsManager } from "../DAL/dao/managers/productsManager.js";

export default class ProductsRepository {
    async findAll(obj) {
        const products = await productsManager.findAll(obj);
        return products;
    }

    async findById(id) {
        const product = await productsManager.findById(id);
        return product;
    }

    async createOne(obj) {
        const createdProduct = await productsManager.createOne(obj);
        return createdProduct;
    }

    async deleteOneProduct(pid) {
        const productDelete = await productsManager.deleteOne(pid);
        return productDelete;
    }

    async updateProduct(pid, obj) {
        const productModific = await productsManager.updateOne(pid, obj);
        return productModific;
    }
}
 