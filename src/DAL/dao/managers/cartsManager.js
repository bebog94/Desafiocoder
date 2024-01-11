import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }

  async findCartById(idCart) {
    const response = await cartsModel.findById(idCart).populate('products.product');
    return response;
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);
    const productIndex = cart.products.findIndex(
      (p) => p.product.equals(idProduct)
    );
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    return cart.save();
  }

  async deleteProduct(idCart, idProduct) {
   
      const cart = await cartsModel.findById(idCart);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const productId = mongoose.Types.ObjectId(idProduct);
      cart.products = cart.products.filter((product) => !product.product.equals(productId));
      const updatedCart = await cart.save();
      return updatedCart;
  }
  async updateCartProducts(idCart, productsArray) {
    
      const cart = await cartsModel.findById(idCart);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.products = productsArray;
      const updatedCart = await cart.save();
      return updatedCart;
  }
  async updateProductQuantity(idCart, idProduct, newQuantity) {
      const cart = await cartsModel.findById(idCart);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === idProduct
      );
      if (productIndex === -1) {
        throw new Error('Product not found in the cart');
      }
      cart.products[productIndex].quantity = newQuantity;
      const updatedCart = await cart.save();
      return updatedCart;
  }
  async clearCart(idCart) {
   
      const cart = await cartsModel.findById(idCart);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.products = [];
      const updatedCart = await cart.save();
      return updatedCart;
    
  }
}

export const cartsManager = new CartsManager();