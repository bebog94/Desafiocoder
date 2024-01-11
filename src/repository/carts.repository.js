import { cartsManager } from "../DAL/dao/managers/cartsManager.js";
import { usersManager } from "../DAL/dao/managers/usersManager.js";
import { ticketsManager } from "../DAL/dao/managers/ticketsManager.js";
import { v4 as uuidv4 } from 'uuid'


export default class CartsRepository {
    async createCart() {
        const cart = await cartsManager.createCart();
        return cart;
    }

    async findCartById(idC) {
        const cart = await cartsManager.findCartById(idC);
        return cart;
    }

    async addProductToCart(idC, idP) {
        const cartNewProduct = await cartsManager.addProductToCart(idC, idP);
        return cartNewProduct;
    }

    async deleteProduct(idC, idP) {
        const cartDeleteProduct = await cartsManager.deleteProduct(idC, idP);
        return cartDeleteProduct;
    }

    async updateCartProducts(idC, productsArray) {
        const updatedCart = await cartsManager.updateCartProducts(idC, productsArray);
        return updatedCart;
    }

    async updateProductQuantity(idC, idP, newQuantity) {
        const updatedCart = await cartsManager.updateProductQuantity(idC, idP, newQuantity);
        return updatedCart;
    }

    async clearCart(idC) {
        const cartEmpty = await cartsManager.clearCart(idC);
        return cartEmpty;
    }
    async purchase(idC){
        const cart = await cartsManager.getCartProducts(idC)
        const user = await usersManager.findUserByCart(idC)
        const products = cart.products
        console.log(user)
        let availableProducts = []
        let unavailableProducts = []
        let totalAmount = 0
        for(let item of products) {
            console.log(item)
            if(item.product.stock >= item.quantity){
                availableProducts.push(item)
                item.product.stock -= item.quantity
                await item.product.save()
                totalAmount += item.quantity * item.product.price
            }else{
                unavailableProducts.push(item)
            }
        }
        
        cart.products = unavailableProducts
        await cart.save()
        
        console.log("available", availableProducts)
        console.log("unavailable", unavailableProducts)
        if(availableProducts.length){
            const ticket = {
                code:uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: user.email
            }
            await ticketsManager.createTicket(ticket)
            console.log("entra")
            return { availableProducts, totalAmount }
        }
        console.log("no entra")
        return { unavailableProducts }
    }
}



