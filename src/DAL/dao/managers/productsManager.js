import { productsModel } from "../db/models/products.models.js";

class ProductsManager {

  async findAll(obj) {
   
      const { limit = 10, page = 1, sort, query} = obj

      const options = {
        page: page,
        limit: limit,
        sort: 'price',
      };
      const filters = {};

      if (query) {
        if (query === 'available') {
          filters.status = true;
        } else {
          filters.category = query;
        }
      }
      if (sort) {
        if (sort === 'asc' || sort === 'desc') {
          options.sort = sort === 'asc' ? 'price' : '-price';
        } else {
          console.log('Valor de ordenamiento no válido. Se ignorará.');
        }
      }
      const result = await productsModel.paginate(filters, options);
      const response = {
        status: result.docs ?'success': "error",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null,
      };
      return response;

  }

  async findById(id) {
    const result = await productsModel.findById(id);
    return result;
  }

  async createOne(obj) {
    const result = await productsModel.create(obj);
    return result;
  }

  async updateOne(id, obj) {
    const result = await productsModel.updateOne({ _id: id }, obj);
    return result;
  }

  async deleteOne(id) {
    const result = await productsModel.deleteOne({ _id: id });
    return result;
  }
}

export const productsManager = new ProductsManager();