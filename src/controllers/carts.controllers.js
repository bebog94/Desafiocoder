import { cartsService } from "../repository/index.js";
import mongoose from "mongoose";
import CustomError from "../errors/error.generator.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";

export const newCart = async (req, res, next) => {
    try {
        const cart = await cartsService.createCart();
        res.json({ cart });
    } catch (error) {
        next(error);
    }
};

export const findCartId = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }
        const cart = await cartsService.findCartById(idCart);
        if (!cart) {
            return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
        } else {
            res.json({ cart });
        }
    } catch (error) {
        next(error)  ;
    }
}

export const addP = async (req, res, next) => {
    try {
        const { idCart, idProduct } = req.params;
        if (!mongoose.Types.ObjectId.isValid(idCart) || !mongoose.Types.ObjectId.isValid(idProduct) ) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }
        const cart = await cartsService.addProductToCart(idCart, idProduct);
        if(!cart){
            return CustomError.generateError(ErrorMessages.CART_OR_PRODUCT_NOT_FOUND,404, ErrorName.CART_OR_PRODUCT_NOT_FOUND);
        }
        res.json({ cart });
    } catch (error) {
        next(error) ;
    }
}

export const deleteP = async (req, res, next) => {
    try {
        const { idCart, idProduct } = req.params;
        if (!mongoose.Types.ObjectId.isValid(idCart) || !mongoose.Types.ObjectId.isValid(idProduct) ) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }
        const updatedCart = await cartsService.deleteProduct(idCart, idProduct);
        if (!updatedCart) {            
            return CustomError.generateError(ErrorMessages.CART_OR_PRODUCT_NOT_FOUND,404, ErrorName.CART_OR_PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product deleted", cart: updatedCart });
    } catch (error) {
        next(error);
    }
}
export const updateCartP = async(req,res, next) =>{
    try {
        const { idCart } = req.params;
        if (!mongoose.Types.ObjectId.isValid(idCart)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }  
        const { products } = req.body;
        if (!products) {            
            return CustomError.generateError(ErrorMessages.MISSING_DATA,400, ErrorName.MISSING_DATA);
        }
      const updatedCart = await cartsService.updateCartProducts(idCart, products);
      if (!updatedCart) {            
        return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
    }
      res.status(200).json({ message: "Cart updated", cart: updatedCart });
    } catch (error) {
        next(error);
    }
}
export const updatePQuantity = async (req,res, next)=>{

    try {
        const { idCart, idProduct } = req.params;
        if (!mongoose.Types.ObjectId.isValid(idCart) || !mongoose.Types.ObjectId.isValid(idProduct) ) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }    
        const { quantity } = req.body;
        if (!quantity) {            
            return CustomError.generateError(ErrorMessages.MISSING_DATA,400, ErrorName.MISSING_DATA);
        }    
      
      const updatedCart = await cartsService.updateProductQuantity(
        idCart,
        idProduct,
        quantity
      );
      if (!updatedCart) {            
        return CustomError.generateError(ErrorMessages.CART_OR_PRODUCT_NOT_FOUND,404, ErrorName.CART_OR_PRODUCT_NOT_FOUND);
    }
      res.status(200).json({ message: "Product quantity updated", cart: updatedCart });
    } catch (error) {
        next(error);
    }
}
export const emptyCart = async (req,res, next)=>{
    try {
        const { idCart } = req.params;
        if (!mongoose.Types.ObjectId.isValid(idCart)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }     
      const updatedCart = await cartsService.clearCart(idCart);
      if (!updatedCart) {            
        return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
    }     
      res.status(200).json({ message: "All products removed from the cart", cart: updatedCart });
    } catch (error) {
        next(error);
    }
}
export const thePurchase = async (req, res, next) => {    
    try {
        const {idCart} = req.params     
        if (!mongoose.Types.ObjectId.isValid(idCart)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }           
        const response = await cartsService.purchase(idCart);
        if (!response) {            
            return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
        }           
        res.status(200).json({ response });
    }catch (error) {
        next(error);
    }
}
