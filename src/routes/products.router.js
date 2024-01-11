import { Router } from "express";
import { findAllProduct,findProductById,createOneProduct,deleteOneProdAll,updateProducts } from "../controllers/products.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router();


router.get("/", findAllProduct)
router.get("/:pid", findProductById)
router.post("/",authMiddleware(["ADMIN"]), createOneProduct)
router.delete("/:pid",authMiddleware(["ADMIN"]), deleteOneProdAll)
router.put("/:pid",authMiddleware(["ADMIN"]), updateProducts)


export default router;