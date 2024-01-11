import { Router } from "express";
import { newCart, findCartId, addP, deleteP, updateCartP, updatePQuantity, emptyCart, thePurchase } from "../controllers/carts.controllers.js";
import {authMiddleware} from "../middleware/auth.middleware.js"

const router = Router();

router.post("/",newCart)
router.get("/:idCart", findCartId)
router.post("/:idCart/products/:idProduct", authMiddleware(["USER"]), addP)
router.delete("/:idCart/products/:idProduct",deleteP)
router.put("/:idCart", updateCartP )
router.put("/:idCart/products/:idProduct",updatePQuantity)
router.delete("/:idCart", emptyCart)
router.get('/:cid/purchase', thePurchase)

export default router;